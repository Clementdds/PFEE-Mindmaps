package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.exceptions.*;
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

@CrossOrigin
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
            throw new UserAlreadyExistsException();
        }
        else
            logger().trace("Finish user find email : not found");
        UserEntity user = new UserEntity(0,
                                         body.email,
                                         userService.hashPwd(body.password));
        UserEntity resultEntity = null;
        logger().trace("Start TX user save");
        resultEntity = userService.save(user);
        logger().trace("Finish TX user save");
        if (resultEntity != null)
            token = TokenManager.ProduceToken(resultEntity.id, resultEntity.username);
        else
            throw new DatabaseInsertionException();
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
        {
            error = matchResult.second;
            if (error.equals("Incorrect password"))
                throw new IncorrectPasswordException();
            else if (error.equals("Email not registered"))
                throw new UserDoesNotExistException();
        }

        return new LogInDtoResponse(token, error);
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, value = "logout")
    public LogOutDtoResponse LogOut(@RequestHeader(value="Authorization") String header)
    {
        String error = null;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1) {
            error = "Invalid token";
            throw new InvalidTokenException();
        }
        if (!userService.userExists(userId)) {
            error = "User does not exist";
            throw new UserDoesNotExistException();
        }
        return new LogOutDtoResponse(error);
    }
}
