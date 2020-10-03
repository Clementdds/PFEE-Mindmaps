package com.mti.mindmap.domain.service;

import com.mti.mindmap.domain.entity.LinkEntity;
import com.mti.mindmap.modeltoentity.LinksModelToEntity;
import com.mti.mindmap.persistence.repository.LinksRepository;
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
