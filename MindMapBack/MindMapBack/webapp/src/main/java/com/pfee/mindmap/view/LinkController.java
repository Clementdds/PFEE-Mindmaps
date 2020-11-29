package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.domain.service.LinksService;
import com.pfee.mindmap.domain.service.MindmapService;
import com.pfee.mindmap.domain.service.UserMapsService;
import com.pfee.mindmap.domain.service.UserService;
import com.pfee.mindmap.view.linkcontroller.GetAllLinksDtoResponse;
import com.pfee.mindmap.view.linkcontroller.GetPrivateMindmapFromUrlDtoResponse;
import com.pfee.mindmap.view.linkcontroller.GetPublicMindmapFromUrlDtoResponse;
import com.pfee.mindmap.view.linkcontroller.PostLinkDtoRequest;
import com.pfee.mindmap.view.linkcontroller.PostLinkDtoResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    private final UserMapsService userMapsService;

    public LinkController(final LinksService linksService,
                          final MindmapService mindmapService,
                          final UserService userService, final UserMapsService userMapsService) {
        this.linksService = linksService;
        this.mindmapService = mindmapService;
        this.userService = userService;
        this.userMapsService = userMapsService;
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

    @RequestMapping(produces = "application/json", method = RequestMethod.POST, path = "postLink")
    public PostLinkDtoResponse PostLink(@RequestHeader(value = "Authorization") String header,
                                        @RequestBody PostLinkDtoRequest request) {
        String error = null;
        Integer id = -1;
        Integer userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";

        if (error != null) {
            logger().error("Error when trying to get mindmap from id: " + error);
            return new PostLinkDtoResponse(null, error, null);
        }

        logger().trace("Start TX change mindmap visibility");
        var mapEntity = mindmapService.ChangeMindmapVisibility(request.isPublic, request.idMindmap);
        logger().trace("End TX change mindmap visibility");

        if (mapEntity == null) {
            logger().error("Error while trying to change mindmap visibility");
            return new PostLinkDtoResponse(null, "Couldn't change mapEntity visibility", null);
        }

        logger().trace("Start TX add link");
        var linkEntity = linksService.CreateLinkToMindmap(mapEntity, request.nodeid);
        logger().trace("End TX add link");

        if (linkEntity == null) {
            logger().error("Error while trying to add link");
            return new PostLinkDtoResponse(null, "Couldn't add link", null);
        }

        if (request.isPublic)
            return new PostLinkDtoResponse(linkEntity.url, null, null);

        //request is private so must share to other users
        var addedUsers = userMapsService.addUsersForPrivateMap(request.emails, userId, mapEntity.id);
        return new PostLinkDtoResponse(linkEntity.url, null, addedUsers);
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, path = "getPublicMindmapFromUrl")
    public GetPublicMindmapFromUrlDtoResponse GetPublicMindmapFromUrl(@RequestParam String url) {
        var entity = linksService.GetMindmapFromPublicUrl(url);
        if (entity == null)
            return new GetPublicMindmapFromUrlDtoResponse(null,
                                                          null,
                                                          "Couldn't retrieve the entity, are you sure that your url " +
                                                                  "is good ?");

        return new GetPublicMindmapFromUrlDtoResponse(entity.nodeid, entity.map.fullmaptext, null);
    }

    @RequestMapping(produces = "application/json", method = RequestMethod.GET, path = "getPrivateMindmapFromUrl")
    public GetPrivateMindmapFromUrlDtoResponse GetPrivateMindmapFromUrl(@RequestHeader(value = "Authorization") String header,
                                                                        @RequestParam String url) {
        String error = null;
        Integer userId = -1;
        if (header != null && !header.equals(""))
            userId = TokenManager.GetIdFromAuthorizationHeader(header);
        if (userId == -1)
            error = "Invalid token";
        if (error == null && !userService.userExists(userId))
            error = "User does not exist";
        if (error != null)
            return new GetPrivateMindmapFromUrlDtoResponse(null, null, error);

        var entity = linksService.GetMindmapFromPrivateUrl(url, userId);
        if (entity == null)
            return new GetPrivateMindmapFromUrlDtoResponse(null,
                                                          null,
                                                          "Couldn't retrieve the entity, are you sure that your url is good ?");

        return new GetPrivateMindmapFromUrlDtoResponse(entity.nodeid, entity.map.fullmaptext, null);
    }
}
