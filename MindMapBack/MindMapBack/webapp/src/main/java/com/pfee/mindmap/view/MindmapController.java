package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoResponse;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoRequest;
import com.pfee.mindmap.view.mindmapscontroller.GetAllMindmapsDtoResponse;
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

    public MindmapController(final MindmapService mindmapService) {
        this.mindmapService = mindmapService;
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
        MindmapEntity entity = new MindmapEntity(0, body.text, false);
        MindmapEntity resultEntity = null;
        if (error == null){
            logger().trace("Start TX Mindmap save");
            resultEntity = mindmapService.save(entity);
            logger().trace("Finish TX Mindmap save");
            id = resultEntity.id;
        }
        if (resultEntity == null)
            error = "error on DB insertion";

        return new CreateMindMapDtoResponse(id, error);
    }
}
