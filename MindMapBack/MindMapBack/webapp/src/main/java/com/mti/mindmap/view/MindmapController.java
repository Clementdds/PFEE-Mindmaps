package com.mti.mindmap.view;

import com.mti.mindmap.domain.entity.MindmapEntity;
import com.mti.mindmap.domain.entity.UserEntity;
import com.mti.mindmap.domain.service.MindmapService;
import com.mti.mindmap.view.mindmapscontroller.GetAllMindmapsDtoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mindmap")
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
                                                                                       mindmapEntity.fullmaptext))
                .collect(Collectors.toList()));
    }
}
