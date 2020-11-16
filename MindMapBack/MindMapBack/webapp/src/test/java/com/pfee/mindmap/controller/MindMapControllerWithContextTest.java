package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.modeltoentity.UserMapsModelToEntity;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import com.pfee.mindmap.persistence.repository.UserRepository;
import com.pfee.mindmap.view.MindmapController;
import com.pfee.mindmap.view.mindmapscontroller.GetMindmapFromIdDtoRequest;
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
public class MindMapControllerWithContextTest {

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
    String MM_TEXT = "json body";
    String MM_NAME = "MyMindMap";
    long MM_ID = -1;

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
                                              new UserMapsModelToEntity(new UserModelToEntity(),
                                                                        new MindmapModelToEntity()));
        mindmapController = new MindmapController(mindmapService, userMapsService, userService);

        UserEntity defaultEntity = userService.save(new UserEntity(0, EMAIL, PWD));
        token = TokenManager.ProduceToken(defaultEntity.id, EMAIL);
        MindmapEntity mmEntity = mindmapService.save(new MindmapEntity(0, MM_TEXT, MM_NAME, false));
        MM_ID = mmEntity.id;
        userMapsService.save(new UserMapsEntity(0, defaultEntity, mmEntity, 0));
    }

    @Test
    public void GetOwnedMindMapSuccessTest() {
        String authToken = "Bearer " + token;
        var result = mindmapController.GetOwnedMindMaps(authToken);
        Assert.assertNotNull(result);
        Assert.assertNotNull(result.mindmapsList);
        Assert.assertNull(result.error);
        Assert.assertTrue(result.mindmapsList.iterator().hasNext());
        var item = result.mindmapsList.iterator().next();
        Assert.assertEquals(MM_ID, (long) item.id);
        Assert.assertEquals(MM_NAME, item.name);
        Assert.assertFalse(item.isPublic);
    }

    @Test
    public void GetMindMapByIdSuccessTest() {
        String authHeader = "Bearer " + token;
        var result = mindmapController.GetMindmapFromid(authHeader, String.valueOf(MM_ID));
        Assert.assertNotNull(result);
        Assert.assertNull(result.error);
        Assert.assertEquals(MM_TEXT, result.mindmap);
    }

    @Test
    public void DeleteMindMapSuccessTest() {
        String authHeader = "Bearer " + token;
        mindmapController.deleteMindMap((int) MM_ID, authHeader);
        Assert.assertEquals(0, mindmapRepository.findAll().size());
        Assert.assertEquals(0, userMapsRepository.findAll().size());
    }
}
