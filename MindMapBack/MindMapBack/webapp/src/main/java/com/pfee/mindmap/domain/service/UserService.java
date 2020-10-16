package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.CanLog;
import utils.IterableUtils;

import java.util.List;

/**
 * @author thomas.curti(thomas.curti @ epita.fr)
 * @since 1.0
 */

@Service
public class UserService implements CanLog {

    private final UserRepository userRepository;

    private final UserModelToEntity userModelToEntity;

    public UserService(final UserRepository userRepository, final UserModelToEntity userModelToEntity) {
        this.userRepository = userRepository;
        this.userModelToEntity = userModelToEntity;
    }

    public List<UserEntity> findAllUsers() {
        logger().trace("Start find all users");
        final var userIterable = userRepository.findAll();
        logger().trace("Found all users & cast Iterable to List");
        final var userList = IterableUtils.toList(userIterable);
        return userModelToEntity.convertList(userList);
    }

    public boolean containsEmail(String email) {
        return userRepository.findByUsername(email) != null;
    }

    @Transactional
    public UserEntity save(final UserEntity entity) {
        final UserModel model = userModelToEntity.revertConvert(entity);
        final var resultModel = userRepository.save(model);
        return userModelToEntity.convert(resultModel);
    }
}
