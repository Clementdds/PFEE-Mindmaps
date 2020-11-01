package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoRequest;
import com.pfee.mindmap.view.mindmapscontroller.GetAllMindmapsDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.GetMindmapDtoRequest;
import com.pfee.mindmap.view.mindmapscontroller.GetMindmapDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.GetOwnedMindMapsDtoResponse;
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

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, path = "getMindmap")
    public GetMindmapDtoResponse GetMindmap(@RequestHeader(value="Authorization") String header,
                                            @RequestBody GetMindmapDtoRequest request)
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
            return new GetMindmapDtoResponse(null , error);
        }

        logger().trace("Start TX get mindmap from id");
        var mindmapEntity = mindmapService.findMindmapById(request.id, request.url);
        logger().trace("Finish TX get mindmap from id");

        if (mindmapEntity == null)
        {
            logger().error("Get mindmap from id fail, no entity found");
            return new GetMindmapDtoResponse(null , "Couldn't find the mindmap in database, are you sure that your id is good ?");
        }

        return new GetMindmapDtoResponse(mindmapEntity.fullmaptext, null);
    }
}
