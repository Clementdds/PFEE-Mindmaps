package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.persistence.model.MindmapModel;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.CanLog;
import utils.IterableUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MindmapService implements CanLog {

    private final MindmapRepository mindmapRepository;

    private final MindmapModelToEntity mindmapModelToEntity;
    private final UserMapsRepository userMapsRepository;

    public MindmapService(final MindmapRepository mindmapRepository,
                          final MindmapModelToEntity mindmapModelToEntity,
                          final UserMapsRepository userMapsRepository) {
        this.mindmapRepository = mindmapRepository;
        this.mindmapModelToEntity = mindmapModelToEntity;
        this.userMapsRepository = userMapsRepository;
    }

    public List<MindmapEntity> findAllMindMap() {
        logger().trace("Start find all mindmaps");
        final var mindmapIterable = mindmapRepository.findAll();
        logger().trace("Found all mindmaps & cast Iterable to List");
        final var mindmapList = IterableUtils.toList(mindmapIterable);
        return mindmapModelToEntity.convertList(mindmapList);
    }

    public List<MindmapEntity> findOwnedMindMaps(Integer userId) {
        List<MindmapModel> maps = userMapsRepository.findAll()
                                                    .stream()
                                                    .filter(um -> um.getUser().getId().equals(userId))
                                                    .filter(um -> um.getUserRole() == 0)
                                                    .map(UserMapsModel::getMap)
                                                    .collect(Collectors.toList());
        return mindmapModelToEntity.convertList(maps);
    }

    @Transactional
    public MindmapEntity save(final MindmapEntity entity) {
        final MindmapModel model = mindmapModelToEntity.revertConvert(entity);
        final var resultModel = mindmapRepository.save(model);
        return mindmapModelToEntity.convert(resultModel);
    }

    public MindmapEntity findMindmapById(Integer mindmapId) {
        //find by url
        MindmapModel mindmapModel = null;
        var model = mindmapRepository.findById(mindmapId);
        if (model.isEmpty())
            return null;
        mindmapModel = model.get();

        var mindmapEntity = mindmapModelToEntity.convert(mindmapModel);
        return mindmapEntity;
    }

    public MindmapEntity ChangeMindmapVisibility(boolean isPublic, int id) {
        var modelOpt = mindmapRepository.findById(id);
        if (modelOpt.isEmpty())
            return null;

        var model = modelOpt.get();
        model.setIspublic(isPublic);
        model = mindmapRepository.save(model);

        var mindmapEntity = mindmapModelToEntity.convert(model);
        return mindmapEntity;
    }

}
