package com.mti.mindmap.view;

import com.mti.mindmap.domain.entity.LinkEntity;
import com.mti.mindmap.domain.service.LinksService;
import com.mti.mindmap.view.linkcontroller.GetAllLinksDtoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.CanLog;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/link")
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
