package com.mti.mindmap.domain.service;

import com.mti.mindmap.domain.entity.MindmapEntity;
import com.mti.mindmap.modeltoentity.MindmapModelToEntity;
import com.mti.mindmap.persistence.repository.MindmapRepository;
import org.springframework.stereotype.Service;
import utils.CanLog;
import utils.IterableUtils;

import java.util.List;

@Service
public class MindmapService implements CanLog {

    private final MindmapRepository mindmapRepository;

    private final MindmapModelToEntity mindmapModelToEntity;

    public MindmapService(final MindmapRepository mindmapRepository,
                          final MindmapModelToEntity mindmapModelToEntity) {
        this.mindmapRepository = mindmapRepository;
        this.mindmapModelToEntity = mindmapModelToEntity;
    }

    public List<MindmapEntity> findAllMindMap() {
        logger().trace("Start find all mindmaps");
        final var mindmapIterable = mindmapRepository.findAll();
        logger().trace("Found all mindmaps & cast Iterable to List");
        final var mindmapList = IterableUtils.toList(mindmapIterable);
        return mindmapModelToEntity.convertList(mindmapList);
    }
}
