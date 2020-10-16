package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.userscontroller.GetAllUserDtoResponse;
import com.pfee.mindmap.view.userscontroller.SignUpDtoRequest;
import com.pfee.mindmap.view.userscontroller.SignUpDtoResponse;
import org.springframework.web.bind.annotation.*;
import utils.CanLog;
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
    public SignUpDtoResponse signUp(@RequestBody SignUpDtoRequest body) {
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
}
