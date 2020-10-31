package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.modeltoentity.LinksModelToEntity;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.persistence.model.LinksModel;
import com.pfee.mindmap.persistence.model.MindmapModel;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import org.springframework.stereotype.Service;
import utils.CanLog;
import utils.IterableUtils;
import utils.Treatment;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LinksService implements CanLog {

    private final LinksRepository linksRepository;

    private final LinksModelToEntity linksModelToEntity;
    private final MindmapModelToEntity mindmapModelToEntity;


    public LinksService(final LinksRepository linksRepository,
                        final LinksModelToEntity linksModelToEntity,
                        final MindmapModelToEntity mindmapModelToEntity) {
        this.linksRepository = linksRepository;
        this.linksModelToEntity = linksModelToEntity;
        this.mindmapModelToEntity = mindmapModelToEntity;
    }

    public List<LinkEntity> findAllLinks() {
        logger().trace("Start find all links");
        final var linksIterable = linksRepository.findAll();
        logger().trace("Found all links & cast Iterable to List");
        final var linkList = IterableUtils.toList(linksIterable);
        return linksModelToEntity.convertList(linkList);
    }

    public LinkEntity CreateLinkToMindmap(MindmapEntity map, BigInteger nodeid)
    {
        var allLinks = IterableUtils.toList(linksRepository.findAll());
        List<String> allUrls = allLinks.stream().map(LinksModel::getUrl).collect(Collectors.toList());

        var url = Treatment.GenerateUniqueUrl(allUrls);
        var model = new LinksModel(null, nodeid, mindmapModelToEntity.revertConvert(map), url);

        model = linksRepository.save(model);

        return linksModelToEntity.convert(model);
    }

}
