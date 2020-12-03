package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.domain.service.LinksService;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.exceptions.ResourceNotFoundException;
import com.pfee.mindmap.exceptions.UserActionNotAllowed;
import com.pfee.mindmap.modeltoentity.LinksModelToEntity;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.modeltoentity.UserMapsModelToEntity;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import com.pfee.mindmap.persistence.repository.MindmapRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
import com.pfee.mindmap.persistence.repository.UserRepository;
import com.pfee.mindmap.view.LinkController;
import com.pfee.mindmap.view.MindmapController;
import com.pfee.mindmap.view.linkcontroller.GetPrivateMindmapFromUrlDtoRequest;
import com.pfee.mindmap.view.linkcontroller.PostLinkDtoRequest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import utils.TokenManager;

import java.math.BigInteger;

@RunWith(SpringRunner.class)
@DataJpaTest
public class LinkControllerWithContextTest {

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
    String token2 = null;
    String EMAIL = "test.user@test.fr";
    String PWD = "password";
    String EMAIL2 = "test2.user@test.fr";
    String PWD2 = "password2";
    String MM_TEXT = "json body";
    String MM_NAME = "MyMindMap";
    String MM_TEXT_PUBLIC = "json body public";
    String MM_NAME_PUBLIC = "MyMindMap public";
    String MM_TEXT_PRIVATE = "json body private";
    String MM_NAME_PRIVATE = "MyMindMap private";
    long MM_ID = -1;
    long MM_ID_PUBLIC = -1;
    long MM_ID_PRIVATE = -1;
    BigInteger NODE_ID = BigInteger.ONE;
    String URL_PUBLIC = null;
    String URL_PRIVATE = null;

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
        linksService = new LinksService(linksRepository,
                userMapsRepository,
                new LinksModelToEntity(new MindmapModelToEntity()),
                new MindmapModelToEntity());
        linkController = new LinkController(linksService,
                mindmapService,
                userService,
                userMapsService);

        UserEntity defaultEntity = userService.save(new UserEntity(0, EMAIL, PWD));
        UserEntity otherEntity = userService.save(new UserEntity(0, EMAIL2, PWD2));
        token = TokenManager.ProduceToken(defaultEntity.id, EMAIL);
        token2 = TokenManager.ProduceToken(otherEntity.id, EMAIL2);
        MindmapEntity mmEntity = mindmapService.save(new MindmapEntity(0, MM_TEXT, MM_NAME, false));
        MindmapEntity mmEntityPublic = mindmapService.save(new MindmapEntity(0, MM_TEXT_PUBLIC, MM_NAME_PUBLIC, true));
        MindmapEntity mmEntityPrivate = mindmapService.save(new MindmapEntity(0, MM_TEXT_PRIVATE, MM_NAME_PRIVATE, false));
        MM_ID = mmEntity.id;
        MM_ID_PUBLIC = mmEntityPublic.id;
        MM_ID_PRIVATE = mmEntityPrivate.id;
        userMapsService.save(new UserMapsEntity(0, defaultEntity, mmEntity, 0));
        userMapsService.save(new UserMapsEntity(0, defaultEntity, mmEntityPublic, 0));
        userMapsService.save(new UserMapsEntity(0, defaultEntity, mmEntityPrivate, 0));
        var response1 = linkController.PostLink("Bearer " + token, new PostLinkDtoRequest((int)MM_ID_PUBLIC, NODE_ID));
        var response2 = linkController.PostLink("Bearer " + token, new PostLinkDtoRequest((int)MM_ID_PRIVATE, NODE_ID));
        URL_PUBLIC = response1.url;
        URL_PRIVATE = response2.url;
    }

    @Test
    public void PostLinkSuccessTest()
    {
        String authToken = "Bearer " + token;
        PostLinkDtoRequest body = new PostLinkDtoRequest((int)MM_ID, BigInteger.ONE);
        var result = linkController.PostLink(authToken, body);
        Assert.assertNotNull(result);
        Assert.assertNotNull(result.url);
        Assert.assertNull(result.error);
        Assert.assertNotEquals(0, linksRepository.count());
    }

    @Test
    public void GetPrivateMindMapFromUrlSuccessTest()
    {
        String authToken = "Bearer " + token;
        var result = linkController.GetPrivateMindmapFromUrl(authToken, URL_PRIVATE);
        Assert.assertNotNull(result);
        Assert.assertNotNull(result.fullmap);
        Assert.assertNotNull(result.name);
        Assert.assertNotNull(result.nodeid);
        Assert.assertEquals(MM_TEXT_PRIVATE, result.fullmap);
        Assert.assertEquals(MM_NAME_PRIVATE, result.name);
        Assert.assertEquals(NODE_ID, result.nodeid);
    }

    @Test(expected = UserActionNotAllowed.class)
    public void GetPrivateMindMapFromUrlNoAccessRights()
    {
        String authToken = "Bearer " + token2;
        linkController.GetPrivateMindmapFromUrl(authToken, URL_PRIVATE);
    }

    @Test
    public void GetPublicMindMapFromUrlSuccessTest()
    {
        var result = linkController.GetPublicMindmapFromUrl(URL_PUBLIC);
        Assert.assertNotNull(result);
        Assert.assertNotNull(result.fullmap);
        Assert.assertNotNull(result.name);
        Assert.assertNotNull(result.nodeid);
        Assert.assertEquals(MM_TEXT_PUBLIC, result.fullmap);
        Assert.assertEquals(MM_NAME_PUBLIC, result.name);
        Assert.assertEquals(NODE_ID, result.nodeid);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void GetPublicMindMapFromUrlNotFound()
    {
        linkController.GetPublicMindmapFromUrl("1234-5678-9101");
    }
}
