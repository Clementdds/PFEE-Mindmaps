package com.pfee.mindmap.view;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.domain.service.LinksService;
import com.pfee.mindmap.view.linkcontroller.GetAllLinksDtoResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/links")
public class LinkController implements CanLog {

    private final LinksService linksService;

    public LinkController(final LinksService linksService) {
        this.linksService = linksService;
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

}
