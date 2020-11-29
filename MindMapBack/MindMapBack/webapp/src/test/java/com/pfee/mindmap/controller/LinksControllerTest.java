package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.LinksService;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.modeltoentity.LinksModelToEntity;
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
import com.pfee.mindmap.view.LinkController;
import com.pfee.mindmap.view.MindmapController;
import com.pfee.mindmap.view.linkcontroller.GetPrivateMindmapFromUrlDtoRequest;
import io.swagger.v3.oas.models.links.Link;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import utils.TokenManager;

import java.math.BigInteger;

@DataJpaTest
@RunWith(SpringRunner.class)
public class LinksControllerTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MindmapRepository mindmapRepository;

    @Autowired
    UserMapsRepository userMapsRepository;

    @Autowired
    LinksRepository linksRepository;

    UserService userService;
    MindmapService mindmapService;
    UserMapsService userMapsService;
    LinksService linksService;

    LinkController linkController;

    String token = null;
    String EMAIL = "test.user@test.fr";
    String PWD = "password";

    @Before
    public void InitController() {
        userRepository.deleteAll();
        mindmapRepository.deleteAll();
        userMapsRepository.deleteAll();
        linksRepository.deleteAll();

        userService = new UserService(userRepository, new UserModelToEntity());

        mindmapService = new MindmapService(mindmapRepository,
                                            new MindmapModelToEntity(),
                                            userMapsRepository);

        userMapsService = new UserMapsService(userMapsRepository,
                                              userRepository,
                                              mindmapRepository,
                                              new UserMapsModelToEntity(new UserModelToEntity(),
                                                                        new MindmapModelToEntity()));

        linksService = new LinksService(linksRepository,
                                        userMapsRepository,
                                        new LinksModelToEntity(new MindmapModelToEntity()),
                                        new MindmapModelToEntity());

        linkController = new LinkController(linksService, mindmapService, userService, userMapsService);

        UserEntity defaultEntity = userService.save(new UserEntity(1, EMAIL, PWD));
        token = TokenManager.ProduceToken(defaultEntity.id, EMAIL);
    }

    @Test
    public void GetPrivateMindmapFromUrlEmptyLogin() {

        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", false, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, 0));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        String authHeader = "";
        var result = linkController.GetPrivateMindmapFromUrl(authHeader, body.url);

        Assert.assertNotNull(result);
        Assert.assertNull(result.name);
        Assert.assertNull(result.nodeid);
        Assert.assertNull(result.fullmap);
        Assert.assertEquals("Invalid token", result.error);
    }

    @Test
    public void GetPrivateMindmapFromUrlNullLogin() {

        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", false, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, 0));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        String authHeader = null;
        var result = linkController.GetPrivateMindmapFromUrl(authHeader, body.url);

        Assert.assertNotNull(result);
        Assert.assertNull(result.name);
        Assert.assertNull(result.nodeid);
        Assert.assertNull(result.fullmap);
        Assert.assertEquals("Invalid token", result.error);
    }

    @Test
    public void GetPrivateMindmapFromUrlWrongLogin() {

        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", false, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, 0));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        String authHeader = "Bearer " + TokenManager.ProduceToken(10000, "WrongEmail@epita.fr");
        var result = linkController.GetPrivateMindmapFromUrl(authHeader, body.url);

        Assert.assertNotNull(result);
        Assert.assertNull(result.name);
        Assert.assertNull(result.nodeid);
        Assert.assertNull(result.fullmap);
        Assert.assertEquals("User does not exist", result.error);
    }

    @Test
    public void GetPrivateMindmapFromUrlWithLoginAndWrongPrivateMap() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", false, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, 0));

        var body = new GetPrivateMindmapFromUrlDtoRequest("WrongUrl");

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        var result = linkController.GetPrivateMindmapFromUrl(authHeader, body.url);

        Assert.assertNotNull(result);
        Assert.assertNull(result.name);
        Assert.assertNull(result.nodeid);
        Assert.assertNull(result.fullmap);
        Assert.assertEquals("Couldn't retrieve the entity, are you sure that your url is good ?", result.error);
    }

    @Test
    public void GetPrivateMindmapFromUrlWithLoginAndGoodPrivateMap() {
        var userModel = userRepository.save(new UserModel(0, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", false, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));
        var userMapModel = userMapsRepository.save(new UserMapsModel(1, userModel, mapModel, 0));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        token = TokenManager.ProduceToken(userModel.getId(), EMAIL);
        String authHeader = "Bearer " + token;
        var result = linkController.GetPrivateMindmapFromUrl(authHeader, body.url);

        Assert.assertNotNull(result);
        Assert.assertEquals(BigInteger.valueOf(123467), result.nodeid);
        Assert.assertEquals("name", result.name);
        Assert.assertEquals("FULLMAPDETEST", result.fullmap);
        Assert.assertNull(result.error);
    }

    @Test
    public void GetPrivateMindmapFromUrlWithLoginAndGoodPublicMap() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", true, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        String authHeader = "Bearer " + token;
        var result = linkController.GetPrivateMindmapFromUrl(authHeader, body.url);

        Assert.assertNotNull(result);
        Assert.assertEquals(BigInteger.valueOf(123467), result.nodeid);
        Assert.assertEquals("name", result.name);
        Assert.assertEquals("FULLMAPDETEST", result.fullmap);
        Assert.assertNull(result.error);
    }


    @Test
    public void GetPublicMindmapFromUrlWithWrongUrl() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", true, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));

        var body = new GetPrivateMindmapFromUrlDtoRequest("WrongUrl");

        var result = linkController.GetPublicMindmapFromUrl(body.url);

        Assert.assertNotNull(result);
        Assert.assertNull(result.name);
        Assert.assertNull(result.nodeid);
        Assert.assertNull(result.fullmap);
        Assert.assertEquals("Couldn't retrieve the entity, are you sure that your url is good ?", result.error);
    }

    @Test
    public void GetPublicMindmapFromUrlWithGoodUrlButNotPublic() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", false, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        var result = linkController.GetPublicMindmapFromUrl(body.url);

        Assert.assertNotNull(result);
        Assert.assertNull(result.name);
        Assert.assertNull(result.nodeid);
        Assert.assertNull(result.fullmap);
        Assert.assertEquals("Couldn't retrieve the entity, are you sure that your url is good ?", result.error);
    }

    @Test
    public void GetPublicMindmapFromUrlWithGoodUrl() {
        var userModel = userRepository.save(new UserModel(1, EMAIL, PWD, null));
        var mapModel = mindmapRepository.save(new MindmapModel(1, "FULLMAPDETEST", "name", true, null, null));
        var linkModel = linksRepository.save(new LinksModel(1, BigInteger.valueOf(123467), mapModel, "urlDeTest"));

        var body = new GetPrivateMindmapFromUrlDtoRequest("urlDeTest");

        var result = linkController.GetPublicMindmapFromUrl(body.url);

        Assert.assertNotNull(result);
        Assert.assertEquals(BigInteger.valueOf(123467), result.nodeid);
        Assert.assertEquals("name", result.name);
        Assert.assertEquals("FULLMAPDETEST", result.fullmap);
        Assert.assertNull(result.error);
    }

}
