package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.modeltoentity.UserMapsModelToEntity;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import com.pfee.mindmap.persistence.repository.UserRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utils.CanLog;
import utils.IterableUtils;
import utils.UserRole;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserMapsService implements CanLog {

    private final UserMapsRepository userMapsRepository;
    private final UserRepository userRepository;
    private final MindmapRepository mindmapRepository;

    private final UserMapsModelToEntity userMapsModelToEntity;

    public UserMapsService(final UserMapsRepository userMapsRepository,
                           final UserRepository userRepository,
                           final MindmapRepository mindmapRepository,
                           final UserMapsModelToEntity userMapsModelToEntity) {
        this.userMapsRepository = userMapsRepository;
        this.userRepository = userRepository;
        this.mindmapRepository = mindmapRepository;
        this.userMapsModelToEntity = userMapsModelToEntity;
    }

    public List<UserMapsEntity> findAllUsersMaps() {
        logger().trace("Start find all usersmaps");
        final var userMapsIterable = userMapsRepository.findAll();
        logger().trace("Found all usersmaps & cast Iterable to List");
        final var userMapsList = IterableUtils.toList(userMapsIterable);
        return userMapsModelToEntity.convertList(userMapsList);
    }

    @CacheEvict(value = "mindmaps", allEntries=true)
    @Transactional
    public UserMapsEntity save(final UserMapsEntity entity) {
        final UserMapsModel model = userMapsModelToEntity.revertConvert(entity);
        final var resultModel = userMapsRepository.save(model);
        return userMapsModelToEntity.convert(resultModel);
    }

    @CacheEvict(value = "mindmaps", allEntries=true)
    @Transactional
    public void deleteByMapid(final Integer mapId) {
        if (mindmapRepository.findById(mapId).isPresent())
            mindmapRepository.deleteById(mapId);
        userMapsRepository.deleteByMapId(mapId);
    }

    @CacheEvict(value = "mindmaps", allEntries=true)
    @Transactional
    public void deleteEveryNullMapId() {
        userMapsRepository.deleteByMapId(null);
    }

    @Cacheable(value = "mindmaps", key = "'getUserRole'+#userId+#mapId")
    public Integer getUserRole(Integer userId, Integer mapId)
    {
        var entry = userMapsRepository.findAll()
                .stream()
                .filter(um -> um.getUser().getId().equals(userId) && um.getMap().getId().equals(mapId))
                .collect(Collectors.toList());
        if (entry.isEmpty())
            return -1;
        return entry.get(0).getUserRole();
    }

    @CacheEvict(value = "mindmaps", allEntries=true)
    public List<String> addUsersForPrivateMap(String[] emails, Integer ownerId, Integer mapId)
    {
        //Add the owner
        var user = userRepository.findById(ownerId);
        if (user.isEmpty())
            return null;

        var currentMap = mindmapRepository.findById(mapId);
        if (currentMap.isEmpty())
            return null;

        userMapsRepository.save(new UserMapsModel(null, user.get(), currentMap.get(), UserRole.Owner.value));

        //Add all other user
        List<String> res = new ArrayList<>();
        for (int i = 0; i < emails.length; i++)
        {
            var currentUser = userRepository.findByUsername(emails[i]);
            if (currentUser == null)
                continue;

            var usermapsModel = userMapsRepository.save(new UserMapsModel(null, currentUser, currentMap.get(), UserRole.Shared.value));
            res.add(emails[i]);
        }

        return res;
    }

}