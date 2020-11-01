package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.UserRepository;
import com.pfee.mindmap.view.UserController;
import com.pfee.mindmap.view.userscontroller.SignUpDtoRequest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.runner.RunWith;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserControllerTest {

    @Autowired
    UserRepository userRepository;

    UserService userService;
    UserController userController;

    @Before
    public void InitController() {
        userRepository.deleteAll();
        userService = new UserService(userRepository, new UserModelToEntity());
        userController = new UserController(userService);
    }

    @AfterEach
    public void ClearDatabase() {
        userRepository.deleteAll();
    }

    @Test
    public void signUpSuccessTest()
    {
        SignUpDtoRequest body = new SignUpDtoRequest("user.user@user.fr",
                "ouioui123");
        var result = userController.SignUp(body);
        var test = userRepository.findAll();
        Assert.assertEquals(1, test.size());
        UserModel m = test.iterator().next();
        Assert.assertEquals("user.user@user.fr", m.getUsername());
        Assert.assertEquals("ouioui123", m.getPassword());
        Assert.assertNotNull(result);
        Assert.assertNull(result.error);
        Assert.assertNotNull(result.token);
    }

}
