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

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.security.MessageDigest;

/**
 * @author thomas.curti(thomas.curti @ epita.fr)
 * @since 1.0
 */

@Service
public class UserService implements CanLog {

    private final UserRepository userRepository;

    private final UserModelToEntity userModelToEntity;

    private MessageDigest messageDigest;

    public UserService(final UserRepository userRepository, final UserModelToEntity userModelToEntity) {
        this.userRepository = userRepository;
        this.userModelToEntity = userModelToEntity;
        try {
            this.messageDigest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public List<UserEntity> findAllUsers() {
        logger().trace("Start find all users");
        final var userIterable = userRepository.findAll();
        logger().trace("Found all users & cast Iterable to List");
        final var userList = IterableUtils.toList(userIterable);
        return userModelToEntity.convertList(userList);
    }

    public UserEntity findById(Integer userId) {
        var entity = userRepository.findById(userId);
        return entity.map(userModelToEntity::convert).orElse(null);
    }

    public UserEntity findByUsername(String userName) {
        var model = userRepository.findByUsername(userName);
        if (model == null)
            return null;
        return userModelToEntity.convert(model);
    }

    public String hashPwd(String password)
    {
        messageDigest.update(password.getBytes());
        return new String(messageDigest.digest());
    }

    public boolean userExists(Integer userId)
    {
        if (userId < 0)
            return false;
        return userRepository.existsById(userId);
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
        String hashedPassword = hashPwd(password);
        if (user.getPassword().equals(hashedPassword)) {
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
