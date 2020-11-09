package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.exceptions.DatabaseInsertionException;
import com.pfee.mindmap.exceptions.InvalidTokenException;
import com.pfee.mindmap.exceptions.NoShareActionException;
import com.pfee.mindmap.exceptions.PublicSharingException;
import com.pfee.mindmap.exceptions.ResourceNotFoundException;
import com.pfee.mindmap.exceptions.UserDoesNotExistException;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoRequest;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.GetAllMindmapsDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.GetMindmapFromIdDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.GetOwnedMindMapsDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.GetSharedMindMapsDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.ShareMindMapDtoRequest;
import com.pfee.mindmap.view.mindmapscontroller.ShareMindMapDtoResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;
import utils.IterableUtils;
import utils.TokenManager;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/mindmaps")
public class MindmapController implements CanLog {

    private final MindmapService mindmapService;
    private final UserMapsService userMapsService;
    private final UserService userService;

    public MindmapController(final MindmapService mindmapService,
                             final UserMapsService userMapsService,
                             final UserService userService) {
        this.mindmapService = mindmapService;
        this.userMapsService = userMapsService;
        this.userService = userService;
    }

    @GetMapping("/")
    public GetAllMindmapsDtoResponse GetAllMindMaps() {
        logger().trace("Start TX mindmaps find all");
        final List<MindmapEntity> mindmapEntityList = mindmapService.findAllMindMap();
        logger().trace("Finish TX mindmaps find all");
        return new GetAllMindmapsDtoResponse(
                mindmapEntityList.stream()
                .map(mindmapEntity -> new GetAllMindmapsDtoResponse.MindmapDtoResponse(mindmapEntity.id,
                                                                                       mindmapEntity.fullmaptext,
                                                                                       mindmapEntity.ispublic))
                .collect(Collectors.toList()));
    }

    @PostMapping(consumes = "application/json", produces = "application/json", path = "create")
    public CreateMindMapDtoResponse CreateMindMap(@RequestHeader(value="Authorization") String header,
                                                  @RequestBody CreateMindMapDtoRequest body) {

        //Can't share to other user a public mindmap
        if (body.isPublic && body.emails != null) {
            //return new CreateMindMapDtoResponse(null, "You cannot share a public mindmap");
            throw new PublicSharingException();
        }

        String error = null;
        Integer id = -1;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1) {
            error = "Invalid token";
            throw new InvalidTokenException();
        }
        if (!userService.userExists(userId)) {
            error = "User does not exist";
            throw new UserDoesNotExistException();
        }
        MindmapEntity entity = new MindmapEntity(0, body.text, body.name, body.isPublic);
        MindmapEntity resultEntity = null;
        logger().trace("Start TX Mindmap save");
        resultEntity = mindmapService.save(entity);
        logger().trace("Finish TX Mindmap save");
        if (resultEntity == null) {
            error = "error when inserting mindmap in database";
            throw new DatabaseInsertionException();
        }
        else
        {
            id = resultEntity.id;
            UserEntity user = userService.findById(userId);
            UserMapsEntity userMap = new UserMapsEntity(0, user, resultEntity, 0);
            logger().trace("Start TX usermap save");
            UserMapsEntity resultUsermap = userMapsService.save(userMap);
            logger().trace("Start TX usermap save");
            if (resultUsermap == null) {
                error = "error when inserting user role in database";
                throw new DatabaseInsertionException();
            }
        }

        if (body.emails == null)
            return new CreateMindMapDtoResponse(id, error);

        int actionCount = 0;
        for (var email : body.emails)
        {
            UserEntity user = userService.findByUsername(email);
            if (user == null)
                continue; //FIXME maybe notify the caller that the user was not found
            if (userMapsService.getUserRole(user.id, resultEntity.id) >= 0)
                continue; //because this user already has a role with this map
            UserMapsEntity um = new UserMapsEntity(0, user, resultEntity, 1);
            userMapsService.save(um);
            actionCount++;
        }

        if (actionCount == 0) {
            error = "No one was added. The users may not exist or they may already have a role";
            throw new NoShareActionException();
        }

        return new CreateMindMapDtoResponse(id, error);
    }

    /*//@PostMapping(consumes = "application/json", produces = "application/json", path = "share")
    public ShareMindMapDtoResponse ShareMindMap() {



        return new ShareMindMapDtoResponse(error);
    }*/

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, value = "getowned")
    public GetOwnedMindMapsDtoResponse GetOwnedMindMaps(@RequestHeader(value="Authorization") String header)
    {
        String error = null;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1) {
            error = "Invalid token";
            throw new InvalidTokenException();
        }
        if (!userService.userExists(userId)) {
            error = "User does not exist";
            throw new UserDoesNotExistException();
        }

        final List<MindmapEntity> entities = mindmapService.findOwnedMindMaps(userId);
        return new GetOwnedMindMapsDtoResponse(
                entities.stream()
                .map(entity -> new GetOwnedMindMapsDtoResponse.MindmapDtoResponse(entity.id,
                        entity.name,
                        entity.ispublic))
                .collect(Collectors.toList()),
                null
        );
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, value = "getshared")
    public GetSharedMindMapsDtoResponse GetSharedMindMaps(@RequestHeader(value="Authorization") String header)
    {
        String error = null;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1) {
            error = "Invalid token";
            throw new InvalidTokenException();
        }
        if (!userService.userExists(userId)) {
            error = "User does not exist";
            throw new UserDoesNotExistException();
        }

        final List<MindmapEntity> entities = mindmapService.findSharedMindMaps(userId);
        return new GetSharedMindMapsDtoResponse(
                entities.stream()
                        .map(entity -> new GetSharedMindMapsDtoResponse.MindmapDtoResponse(entity.id,
                                entity.name,
                                entity.ispublic))
                        .collect(Collectors.toList()),
                null
        );
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, path = "getMindmapFromId")
    public GetMindmapFromIdDtoResponse GetMindmapFromid(@RequestHeader(value="Authorization") String header,
                                                  @RequestParam String mapId)
    {
        String error = null;
        Integer id = -1;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1) {
            error = "Invalid token";
            throw new InvalidTokenException();
        }
        if (!userService.userExists(userId)) {
            error = "User does not exist";
            throw new UserDoesNotExistException();
        }

        logger().trace("Start TX get mindmap from id");
        var mindmapEntity = mindmapService.findMindmapById(Integer.parseInt(mapId));
        logger().trace("Finish TX get mindmap from id");

        if (mindmapEntity == null)
        {
            logger().error("Get mindmap from id fail, no entity found");
            throw new ResourceNotFoundException();
        }

        return new GetMindmapFromIdDtoResponse(mindmapEntity.fullmaptext, null);
    }
}
