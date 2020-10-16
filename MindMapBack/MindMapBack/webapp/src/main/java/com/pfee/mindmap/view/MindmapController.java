package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.view.mindmapscontroller.GetAllMindmapsDtoResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;

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
}
