package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.modeltoentity.UserMapsModelToEntity;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.CanLog;
import utils.IterableUtils;

import java.util.List;

@Service
public class UserMapsService implements CanLog {

    private final UserMapsRepository userMapsRepository;

    private final UserMapsModelToEntity userMapsModelToEntity;

    public UserMapsService(final UserMapsRepository userMapsRepository, final UserMapsModelToEntity userMapsModelToEntity) {
        this.userMapsRepository = userMapsRepository;
        this.userMapsModelToEntity = userMapsModelToEntity;
    }

    public List<UserMapsEntity> findAllUsersMaps() {
        logger().trace("Start find all usersmaps");
        final var userMapsIterable = userMapsRepository.findAll();
        logger().trace("Found all usersmaps & cast Iterable to List");
        final var userMapsList = IterableUtils.toList(userMapsIterable);
        return userMapsModelToEntity.convertList(userMapsList);
    }

    @Transactional
    public UserMapsEntity save(final UserMapsEntity entity) {
        final UserMapsModel model = userMapsModelToEntity.revertConvert(entity);
        final var resultModel = userMapsRepository.save(model);
        return userMapsModelToEntity.convert(resultModel);
    }
}