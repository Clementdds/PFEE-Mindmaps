package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.persistence.model.MindmapModel;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    public MindmapEntity save(final MindmapEntity entity) {
        final MindmapModel model = mindmapModelToEntity.revertConvert(entity);
        final var resultModel = mindmapRepository.save(model);
        return mindmapModelToEntity.convert(resultModel);
    }
}
