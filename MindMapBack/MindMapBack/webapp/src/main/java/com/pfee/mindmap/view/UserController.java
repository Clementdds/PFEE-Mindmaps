package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.userscontroller.GetAllUserDtoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;

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
}
