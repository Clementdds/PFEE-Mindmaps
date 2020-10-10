package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.modeltoentity.LinksModelToEntity;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import org.springframework.stereotype.Service;
import utils.CanLog;
import utils.IterableUtils;

import java.util.List;

@Service
public class LinksService implements CanLog {

    private final LinksRepository linksRepository;

    private final LinksModelToEntity linksModelToEntity;

    public LinksService(final LinksRepository linksRepository,
                        final LinksModelToEntity linksModelToEntity) {
        this.linksRepository = linksRepository;
        this.linksModelToEntity = linksModelToEntity;
    }

    public List<LinkEntity> findAllLinks() {
        logger().trace("Start find all links");
        final var linksIterable = linksRepository.findAll();
        logger().trace("Found all links & cast Iterable to List");
        final var linkList = IterableUtils.toList(linksIterable);
        return linksModelToEntity.convertList(linkList);
    }

}
