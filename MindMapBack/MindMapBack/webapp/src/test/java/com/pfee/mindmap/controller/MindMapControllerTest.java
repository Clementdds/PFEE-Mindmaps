package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.exceptions.InvalidTokenException;
import com.pfee.mindmap.exceptions.ResourceNotFoundException;
import com.pfee.mindmap.exceptions.UserDoesNotExistException;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.modeltoentity.UserMapsModelToEntity;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.model.LinksModel;
import com.pfee.mindmap.persistence.model.MindmapModel;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import com.pfee.mindmap.persistence.repository.UserRepository;
import com.pfee.mindmap.view.MindmapController;
import com.pfee.mindmap.view.linkcontroller.GetPrivateMindmapFromUrlDtoRequest;
import com.pfee.mindmap.view.mindmapscontroller.CreateMindMapDtoRequest;
import org.assertj.core.util.IterableUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import utils.IterableUtils;
import utils.TokenManager;
import utils.UserRole;

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
                                              new UserMapsModelToEntity(new UserModelToEntity(),
                                                                        new MindmapModelToEntity()));

        mindmapController = new MindmapController(mindmapService, userMapsService, userService);

        UserEntity defaultEntity = userService.save(new UserEntity(1, EMAIL, PWD));
        token = TokenManager.ProduceToken(defaultEntity.id, EMAIL);
    }

    @Test
    public void CreateMindMapSuccessTest() {
        mindmapRepository.deleteAll();
        userMapsRepository.deleteAll();
        CreateMindMapDtoRequest body = new CreateMindMapDtoRequest("json body", "MyMindMap", true, null);
        String authHeader = "Bearer " + token;
        var result = mindmapController.CreateMindMap(authHeader, body);
        Assert.assertNotNull(result);
        Assert.assertNotEquals(-1, (long) result.id);
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
        Assert.assertEquals(0, (long) um.getUserRole());
    }

    @Test
    public void CreateMindMapWrongLoginTest() {

        mindmapRepository.deleteAll();
        userMapsRepository.deleteAll();

        CreateMindMapDtoRequest body = new CreateMindMapDtoRequest("json body", "MyMindMap", true, null);

        String authHeader = "Bearer " + TokenManager.ProduceToken(1000, "WrongEmail@epita.fr");
        try {
            mindmapController.CreateMindMap(authHeader, body);
        }
        catch (UserDoesNotExistException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail("Wrong exception");
        }
        Assert.fail("Should throw exception");
    }

    @Test
    public void CreateMindMapWrongTokenTest() {

        mindmapRepository.deleteAll();
        userMapsRepository.deleteAll();

        CreateMindMapDtoRequest body = new CreateMindMapDtoRequest("json body", "MyMindMap", true, null);

        String authHeader = "Bearer " + TokenManager.ProduceToken(-1, "WrongEmail@epita.fr");
        try {
            mindmapController.CreateMindMap(authHeader, body);
        }
        catch (InvalidTokenException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail("Wrong exception");
        }
        Assert.fail("Should throw exception");
    }

    @Test
    public void GetMindmapFromGoodIdPublic() {

        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = new MindmapModel(0, "fullmapTest", "name", false, null, null);

        mapModel = mindmapRepository.save(mapModel);

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        var result = mindmapController.GetMindmapFromid(authHeader, mapModel.getId().toString());

        Assert.assertNotNull(result);
        Assert.assertNull(result.error);
        Assert.assertEquals("name", result.name);
        Assert.assertEquals("fullmapTest", result.mindmap);
    }

    @Test
    public void GetMindmapFromGoodIdPrivate() {

        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = new MindmapModel(0, "fullmapTest", "name", false, null, null);

        mapModel = mindmapRepository.save(mapModel);

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        var result = mindmapController.GetMindmapFromid(authHeader, mapModel.getId().toString());

        Assert.assertNotNull(result);
        Assert.assertNull(result.error);
        Assert.assertEquals("name", result.name);
        Assert.assertEquals("fullmapTest", result.mindmap);
    }

    @Test
    public void GetMindmapFromWrongId() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = new MindmapModel(0, "fullmapTest", "name", false, null, null);

        mapModel = mindmapRepository.save(mapModel);

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        try {
            mindmapController.GetMindmapFromid(authHeader, "10000");
        }
        catch (ResourceNotFoundException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail();
        }
        Assert.fail();
    }

    @Test
    public void GetMindmapFromWrongUser() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = new MindmapModel(0, "fullmapTest", "name", false, null, null);

        mapModel = mindmapRepository.save(mapModel);

        token = TokenManager.ProduceToken(10000, "WrongEmail@epita.fr");
        String authHeader = "Bearer " + token;
        try {
            mindmapController.GetMindmapFromid(authHeader, mapModel.getId().toString());
        }
        catch (UserDoesNotExistException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail();
        }
        Assert.fail();
    }

    @Test
    public void GetMindmapFromWrongToken() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = new MindmapModel(0, "fullmapTest", "name", false, null, null);

        mapModel = mindmapRepository.save(mapModel);

        token = TokenManager.ProduceToken(-1, "WrongEmail@epita.fr");
        String authHeader = "Bearer " + token;
        try {
            mindmapController.GetMindmapFromid(authHeader, mapModel.getId().toString());
        }
        catch (InvalidTokenException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail();
        }
        Assert.fail();
    }


    @Test
    public void GetSharedMindmapFromWrongUser() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(0, "fullmapTest", "name", true, null, null));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, UserRole.Shared.value));

        token = TokenManager.ProduceToken(10000, "WrongEmail@epita.fr");
        String authHeader = "Bearer " + token;
        try {
            mindmapController.GetSharedMindMaps(authHeader);
        }
        catch (UserDoesNotExistException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail();
        }
        Assert.fail();
    }

    @Test
    public void GetSharedMindmapFromWrongToken() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(0, "fullmapTest", "name", true, null, null));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, UserRole.Shared.value));

        token = TokenManager.ProduceToken(-1, "WrongEmail@epita.fr");
        String authHeader = "Bearer " + token;
        try {
            mindmapController.GetSharedMindMaps(authHeader);
        }
        catch (InvalidTokenException e) {
            return;
        }
        catch (Exception e) {
            Assert.fail();
        }
        Assert.fail();
    }

    @Test
    public void GetSharedMindmapGoodPrivate() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(0, "fullmapTest", "name", false, null, null));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, UserRole.Shared.value));

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        var result = mindmapController.GetSharedMindMaps(authHeader);

        Assert.assertNotNull(result);
        var resultList = IterableUtils.toList(result.mindmapsList);
        Assert.assertEquals(1, resultList.size());
        Assert.assertEquals(mapModel.getId(), resultList.get(0).id);
        Assert.assertEquals(mapModel.getIspublic(), resultList.get(0).isPublic);
        Assert.assertEquals(mapModel.getName(), resultList.get(0).name);
    }

    @Test
    public void GetSharedMindmapGoodPublic() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(0, "fullmapTest", "name", true, null, null));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, UserRole.Shared.value));

        mapModel = mindmapRepository.save(mapModel);

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        var result = mindmapController.GetSharedMindMaps(authHeader);

        Assert.assertNotNull(result);
        var resultList = IterableUtils.toList(result.mindmapsList);
        Assert.assertEquals(1, resultList.size());
        Assert.assertEquals(mapModel.getId(), resultList.get(0).id);
        Assert.assertEquals(mapModel.getIspublic(), resultList.get(0).isPublic);
        Assert.assertEquals(mapModel.getName(), resultList.get(0).name);
    }
}
