package com.pfee.mindmap.domain.service;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.modeltoentity.LinksModelToEntity;
import com.pfee.mindmap.modeltoentity.MindmapModelToEntity;
import com.pfee.mindmap.persistence.model.LinksModel;
import com.pfee.mindmap.persistence.repository.LinksRepository;
import com.pfee.mindmap.persistence.repository.UserMapsRepository;
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
    private final UserMapsRepository userMapsRepository;

    private final LinksModelToEntity linksModelToEntity;
    private final MindmapModelToEntity mindmapModelToEntity;


    public LinksService(final LinksRepository linksRepository,
                        final UserMapsRepository userMapsRepository,
                        final LinksModelToEntity linksModelToEntity,
                        final MindmapModelToEntity mindmapModelToEntity) {
        this.linksRepository = linksRepository;
        this.userMapsRepository = userMapsRepository;
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

    public LinkEntity GetMindmapFromUrl(String url)
    {
        var models = IterableUtils.toList(linksRepository.findAll());
        if (models.isEmpty())
            return null;

        var linkModel = models.stream().filter(link -> (link.getUrl()).equals(url)).findFirst();
        if (linkModel.isEmpty())
            return null;

        return linksModelToEntity.convert(linkModel.get());
    }

    public LinkEntity GetMindmapFromPrivateUrl(String url, int userid)
    {
        var linkEntity = GetMindmapFromUrl(url);
        if (linkEntity == null)
            return null;

        if (linkEntity.map.ispublic)
            return linkEntity;

        var usermaps = userMapsRepository.findAll();

        var usermapsByUserId = usermaps.stream().filter(usermap -> usermap.getUser().getId() == userid).collect(Collectors.toList());

        if (usermapsByUserId.isEmpty())
            return null;

        //We don't check role here because the user is either "shared" or "owner"
        var usermapsByUserIdAndMapId = usermapsByUserId.stream().filter(usermap -> usermap.getMap().getId().equals(linkEntity.id)).collect(Collectors.toList());
        if (usermapsByUserIdAndMapId.isEmpty())
            return null;

        return linkEntity;
    }

    public LinkEntity GetMindmapFromPublicUrl(String url)
    {
        var linkEntity = GetMindmapFromUrl(url);
        if (linkEntity == null)
            return null;

        if (linkEntity.map.ispublic)
            return linkEntity;

        return null;
    }

}
