package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.modeltoentity.UserMapsModelToEntity;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.model.MindmapModel;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import com.pfee.mindmap.persistence.repository.UserRepository;
import com.pfee.mindmap.view.MindmapController;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoRequest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import utils.TokenManager;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MindMapControllerTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MindmapRepository mindmapRepository;

    @Autowired
    UserMapsRepository userMapsRepository;

    UserService userService;
    MindmapService mindmapService;
    UserMapsService userMapsService;

    MindmapController mindmapController;

    String token = null;
    String EMAIL = "test.user@test.fr";
    String PWD = "password";

    @Before
    public void InitController() {
        userRepository.deleteAll();
        mindmapRepository.deleteAll();
        userMapsRepository.deleteAll();
        userService = new UserService(userRepository, new UserModelToEntity());
        mindmapService = new MindmapService(mindmapRepository,
                new MindmapModelToEntity(),
                userMapsRepository);
        userMapsService = new UserMapsService(userMapsRepository,
                userRepository,
                mindmapRepository,
                new UserMapsModelToEntity(new UserModelToEntity(), new MindmapModelToEntity()));
        mindmapController = new MindmapController(mindmapService, userMapsService, userService);

        UserEntity defaultEntity = userService.save(new UserEntity(0, EMAIL, PWD));
        token = TokenManager.ProduceToken(defaultEntity.id, EMAIL);
    }

    @Test
    public void CreateMindMapSuccessTest()
    {
        mindmapRepository.deleteAll();
        userMapsRepository.deleteAll();
        CreateMindMapDtoRequest body = new CreateMindMapDtoRequest("json body", "MyMindMap", false);
        String authHeader = "Bearer " + token;
        var result = mindmapController.CreateMindMap(authHeader, body);
        Assert.assertNotNull(result);
        Assert.assertNotEquals(java.util.Optional.of(-1), result.id);
        Assert.assertNull(result.error);
        var mms = mindmapRepository.findAll();
        Assert.assertEquals(1, mms.size());
        MindmapModel m = mms.iterator().next();
        Assert.assertEquals("json body", m.getFullmaptext());
        Assert.assertEquals("MyMindMap", m.getName());
        var ums = userMapsRepository.findAll();
        Assert.assertEquals(1, ums.size());
        UserMapsModel um = ums.iterator().next();
        Assert.assertEquals(EMAIL, um.getUser().getUsername());
        Assert.assertEquals(result.id, um.getMap().getId());
    }
}
