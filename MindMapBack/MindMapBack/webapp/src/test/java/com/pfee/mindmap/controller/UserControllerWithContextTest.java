package com.pfee.mindmap.controller;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.exceptions.IncorrectPasswordException;
import com.pfee.mindmap.exceptions.UserAlreadyExistsException;
import com.pfee.mindmap.exceptions.UserDoesNotExistException;
import com.pfee.mindmap.modeltoentity.UserModelToEntity;
import com.pfee.mindmap.persistence.model.UserModel;
import com.pfee.mindmap.persistence.repository.UserRepository;
import com.pfee.mindmap.view.UserController;
import com.pfee.mindmap.view.userscontroller.LogInDtoRequest;
import com.pfee.mindmap.view.userscontroller.SignUpDtoRequest;
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
public class UserControllerWithContextTest {

    @Autowired
    UserRepository userRepository;

    UserService userService;
    UserController userController;

    String token = null;
    String EMAIL = "test.user@test.fr";
    String PWD = "password";

    @Before
    public void InitController() {
        userRepository.deleteAll();
        userService = new UserService(userRepository, new UserModelToEntity());
        userController = new UserController(userService);

        UserEntity defaultEntity = userService.save(new UserEntity(0, EMAIL, userService.hashPwd(PWD)));
        token = TokenManager.ProduceToken(defaultEntity.id, EMAIL);
    }

    @Test
    public void LogInSuccessTest()
    {
        LogInDtoRequest body = new LogInDtoRequest(EMAIL, PWD);
        var result = userController.LogIn(body);
        Assert.assertNotNull(result);
        Assert.assertNotNull(result.token);
        Assert.assertNull(result.error);
        Assert.assertEquals(token, result.token);
    }

    @Test
    public void LogOutSuccessTest()
    {
        String authHeader = "Bearer " + token;
        var result = userController.LogOut(authHeader);
        Assert.assertNotNull(result);
        Assert.assertNull(result.error);
    }

    @Test(expected = UserAlreadyExistsException.class)
    public void SignUpAlreadyExists()
    {
        SignUpDtoRequest body = new SignUpDtoRequest(EMAIL, PWD);
        userController.SignUp(body);
    }

    @Test(expected = UserDoesNotExistException.class)
    public void LogInEmailNotRegistered()
    {
        LogInDtoRequest body = new LogInDtoRequest("unknown.user@test.fr", PWD);
        var result = userController.LogIn(body);
    }

    @Test(expected = IncorrectPasswordException.class)
    public void LogInEmailIncorrectPassword()
    {
        LogInDtoRequest body = new LogInDtoRequest(EMAIL, "incorrect password");
        var result = userController.LogIn(body);
    }

}
