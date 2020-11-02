package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.mindmapscontroller.*;
import org.springframework.web.bind.annotation.*;
import utils.CanLog;
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

    @PostMapping(path = "create", consumes = "application/json", produces = "application/json")
    public CreateMindMapDtoResponse CreateMindMap(@RequestHeader(value="Authorization") String header,
                                                  @RequestBody CreateMindMapDtoRequest body) {
        String error = null;
        Integer id = -1;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";
        MindmapEntity entity = new MindmapEntity(0, body.text, body.name, body.isPublic);
        MindmapEntity resultEntity = null;
        if (error == null){
            logger().trace("Start TX Mindmap save");
            resultEntity = mindmapService.save(entity);
            logger().trace("Finish TX Mindmap save");
            id = resultEntity.id;
        }
        if (error == null && resultEntity == null)
            error = "error on DB insertion";
        else if (resultEntity != null)
        {
            UserEntity user = userService.findById(userId);
            UserMapsEntity userMap = new UserMapsEntity(0, user, resultEntity, 0);
            logger().trace("Start TX usermap save");
            UserMapsEntity resultUsermap = userMapsService.save(userMap);
            logger().trace("Start TX usermap save");
        }

        return new CreateMindMapDtoResponse(id, error);
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, value = "getowned")
    public GetOwnedMindMapsDtoResponse GetOwnedMindMaps(@RequestHeader(value="Authorization") String header)
    {
        String error = null;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";
        if (error != null)
            return new GetOwnedMindMapsDtoResponse(null, error);

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
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";
        if (error != null)
            return new GetSharedMindMapsDtoResponse(null, error);

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

    @PostMapping(path = "share", consumes = "application/json", produces = "application/json")
    public ShareMindMapDtoResponse ShareMindMap(@RequestHeader(value="Authorization") String header,
                                                  @RequestBody ShareMindMapDtoRequest body) {
        String error = null;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";
        var currentMap = mindmapService.findMindmapById(body.mapId);
        if (currentMap.ispublic)
            error = "You cannot share a public mindmap";
        if (error != null)
            return new ShareMindMapDtoResponse(error);

        int actionCount = 0;
        for (var email : body.emails)
        {
            UserEntity user = userService.findByUsername(email);
            if (user == null)
                continue; //FIXME maybe notify the caller that the user was not found
            if (userMapsService.getUserRole(user.id, body.mapId) >= 0)
                continue; //because this user already has a role with this map
            UserMapsEntity um = new UserMapsEntity(0, user, currentMap, 1);
            userMapsService.save(um);
            actionCount++;
        }

        if (actionCount == 0)
            error = "No one was added. The users may not exist or they may already have a role";

        return new ShareMindMapDtoResponse(error);
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, path = "getMindmapFromId")
    public GetMindmapFromIdDtoResponse GetMindmapFromid(@RequestHeader(value="Authorization") String header,
                                                  @RequestBody GetMindmapFromIdDtoRequest request)
    {
        String error = null;
        Integer id = -1;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";

        if (error != null)
        {
            logger().error("Error when trying to get mindmap from id: " + error);
            return new GetMindmapFromIdDtoResponse(null , error);
        }

        logger().trace("Start TX get mindmap from id");
        var mindmapEntity = mindmapService.findMindmapById(request.id);
        logger().trace("Finish TX get mindmap from id");

        if (mindmapEntity == null)
        {
            logger().error("Get mindmap from id fail, no entity found");
            return new GetMindmapFromIdDtoResponse(null , "Couldn't find the mindmap in database, are you sure that your id is good ?");
        }

        return new GetMindmapFromIdDtoResponse(mindmapEntity.fullmaptext, null);
    }
}
