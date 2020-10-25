package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.domain.service.LinksService;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.linkcontroller.GetAllLinksDtoResponse;
import com.pfee.mindmap.view.linkcontroller.PostPublicLinkDtoRequest;
import com.pfee.mindmap.view.linkcontroller.PostPublicLinkDtoResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;
import utils.TokenManager;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/links")
public class LinkController implements CanLog {

    private final LinksService linksService;
    private final MindmapService mindmapService;
    private final UserService userService;

    public LinkController(final LinksService linksService,
                          final MindmapService mindmapService,
                          final UserService userService) {
        this.linksService = linksService;
        this.mindmapService = mindmapService;
        this.userService = userService;
    }

    @GetMapping("/")
    public GetAllLinksDtoResponse GetAllLinks() {
        logger().trace("Start TX links find all");
        final List<LinkEntity> linkEntityList = linksService.findAllLinks();
        logger().trace("Finish TX links find all");
        return new GetAllLinksDtoResponse(
                linkEntityList.stream()
                                 .map(linkEntity -> new GetAllLinksDtoResponse.LinksDtoResponse(linkEntity.id,
                                                                                                linkEntity.nodeid,
                                                                                                new GetAllLinksDtoResponse.MindmapDtoResponse(
                                                                                                        linkEntity.map.id,
                                                                                                        linkEntity.map.fullmaptext
                                                                                                ),
                                                                                                linkEntity.url))
                                 .collect(Collectors.toList()));
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.POST, path = "addPublicLink")
    public PostPublicLinkDtoResponse PostPublicLink(@RequestHeader(value="Authorization") String header,
                                                    @RequestBody PostPublicLinkDtoRequest request)
    {
        String error = null;
        Integer id = -1;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";

        if (error != null)
        {
            logger().error("Error when trying to get mindmap from id: " + error);
            return new PostPublicLinkDtoResponse(null , error);
        }


        logger().trace("Start TX change mindmap visibility");
        var mapEntity = mindmapService.ChangeMindmapVisibility(true, request.idMindmap);
        logger().trace("End TX change mindmap visibility");

        if (mapEntity == null){
            logger().error("Error while trying to change mindmap visibility");
            return new PostPublicLinkDtoResponse(null, "Couldn't change mapEntity visibility");
        }

        logger().trace("Start TX add link");
        var linkEntity = linksService.CreateLinkToMindmap(mapEntity, request.nodeid);
        logger().trace("End TX add link");

        if (linkEntity == null){
            logger().error("Error while trying to add link");
            return new PostPublicLinkDtoResponse(null, "Couldn't add link");
        }

        return new PostPublicLinkDtoResponse(linkEntity.url, null);
    }
}
