package com.pfee.mindmap.modeltoentity;

import com.pfee.mindmap.domain.entity.LinkEntity;
import com.pfee.mindmap.persistence.model.LinksModel;
import scope.ConverterService;
import utils.Converter;

@ConverterService
public class LinksModelToEntity implements Converter.Reversible<LinksModel, LinkEntity> {

    private final MindmapModelToEntity mindmapModelToEntity;

    public LinksModelToEntity(final MindmapModelToEntity mindmapModelToEntity) {
        this.mindmapModelToEntity = mindmapModelToEntity;
    }

    /**
     * Convert an LinksModel to LinkEntity.
     */
    @Override
    public LinkEntity convert(final LinksModel from) {
        return new LinkEntity(from.getId(), from.getNodeid(), mindmapModelToEntity.convert(from.getMap()), from.getUrl());
    }

    /**
     * Convert an LinkEntity to LinksModel.
     */
    @Override
    public LinksModel revertConvert(final LinkEntity from) {
        return new LinksModel(from.id, from.nodeid, null, from.url);
    }
}
