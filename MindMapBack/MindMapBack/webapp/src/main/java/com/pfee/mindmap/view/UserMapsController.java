package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.view.usermapscontroller.GetAllUserMapsDtoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usermaps")
public class UserMapsController implements CanLog {

    private final UserMapsService userMapsService;

    public UserMapsController(final UserMapsService userMapsService) {
        this.userMapsService = userMapsService;
    }

    @GetMapping("/")
    public GetAllUserMapsDtoResponse GetAllUser() {
        logger().trace("Start TX user find all");
        final List<UserMapsEntity> userMapsEntityList = userMapsService.findAllUsersMaps();
        logger().trace("Finish TX user find all");
        return new GetAllUserMapsDtoResponse(
                userMapsEntityList.stream()
                              .map(usermapsEntity -> new GetAllUserMapsDtoResponse.UserMapsDtoResponse(usermapsEntity.id,
                                                                                                       new GetAllUserMapsDtoResponse.UserMapsDtoResponse.UserDtoResponse(usermapsEntity.user.id, usermapsEntity.user.username, usermapsEntity.user.password),
                                                                                                       new GetAllUserMapsDtoResponse.UserMapsDtoResponse.MindmapDtoResponse(usermapsEntity.map.id, usermapsEntity.map.fullmaptext),
                                                                                                       usermapsEntity.userRole))
                              .collect(Collectors.toList()));
    }

}
