package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.CanLog;
import utils.IterableUtils;
import utils.Pair;
import utils.TokenManager;

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

    /**
     * This method handles the login phase via password matching.
     * @param email the user's inputted email.
     * @param password the user's inputted password.
     * @return A pair of values. The first is true when login succeeds, false otherwise.
     * The second is the token when login succeeds, the error message otherwise.
     */
    public Pair<Boolean, String> matchPassword(String email, String password)
    {
        UserModel user = userRepository.findByUsername(email);
        if (user == null)
            return new Pair<>(false, "Email not registered");
        if (user.getPassword().equals(password)) {
            String token = TokenManager.ProduceToken(user.getId(), user.getUsername());
            return new Pair<>(true, token);
        }
        return new Pair<>(false, "Incorrect password");
    }

    @Transactional
    public UserEntity save(final UserEntity entity) {
        final UserModel model = userModelToEntity.revertConvert(entity);
        final var resultModel = userRepository.save(model);
        return userModelToEntity.convert(resultModel);
    }
}
