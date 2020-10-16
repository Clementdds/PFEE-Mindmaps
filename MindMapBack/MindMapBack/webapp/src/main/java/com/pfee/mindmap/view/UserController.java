package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.userscontroller.*;
import org.springframework.web.bind.annotation.*;
import utils.CanLog;
import utils.Pair;
import utils.TokenManager;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author thomas.curti(thomas.curti @ epita.fr)
 * @since 1.0
 */

@RestController
@RequestMapping("/users")
public class UserController implements CanLog {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public GetAllUserDtoResponse GetAllUser() {
        logger().trace("Start TX user find all");
        final List<UserEntity> userEntityList = userService.findAllUsers();
        logger().trace("Finish TX user find all");
        return new GetAllUserDtoResponse(
                userEntityList.stream()
                .map(userEntity -> new GetAllUserDtoResponse.UserDtoResponse(userEntity.id,
                                                                             userEntity.username,
                                                                             userEntity.password))
                .collect(Collectors.toList()));
    }

    @PostMapping(path = "/signup", consumes = "application/json", produces = "application/json")
    public SignUpDtoResponse SignUp(@RequestBody SignUpDtoRequest body) {
        String error = null;
        String token = null;
        logger().trace("Start user find email");
        if (userService.containsEmail(body.email)) {
            error = "Username already exists";
            logger().trace("Finish user  find email : found");
        }
        else
            logger().trace("Finish user find email : not found");
        UserEntity user = new UserEntity(0,
                                         body.email,
                                         body.password);
        UserEntity resultEntity = null;
        if (error == null) {
            logger().trace("");
            logger().trace("Start TX user save");
            resultEntity = userService.save(user);
            logger().trace("Finish TX user save");
        }
        if (resultEntity != null)
            token = TokenManager.ProduceToken(resultEntity.id, resultEntity.username);
        return new SignUpDtoResponse(token, error);
    }

    @PostMapping(path = "login", consumes = "application/json", produces = "application/json")
    public LogInDtoResponse LogIn(@RequestBody LogInDtoRequest body)
    {
        String error = null;
        String token = null;
        logger().trace("Start user match password");
        Pair<Boolean, String> matchResult = userService.matchPassword(body.email, body.password);
        logger().trace("Finish user match password");
        if (matchResult.first)
            token = matchResult.second;
        else
            error = matchResult.second;

        return new LogInDtoResponse(token, error);
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, value = "logout")
    public LogOutDtoResponse LogOut(@RequestHeader(value="Authorization") String tokenString)
    {
        String error = null;
        String[] tokenArray = tokenString.split(" ");
        String token = tokenArray[1];
        Integer userId = TokenManager.GetIdFromToken(token);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";
        return new LogOutDtoResponse(error);
    }
}
