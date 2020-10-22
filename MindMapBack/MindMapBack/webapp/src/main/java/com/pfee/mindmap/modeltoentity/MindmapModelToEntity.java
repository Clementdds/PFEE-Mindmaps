package com.pfee.mindmap.modeltoentity;

import com.pfee.mindmap.domain.entity.MindmapEntity;
import com.pfee.mindmap.persistence.model.MindmapModel;
import scope.ConverterService;
import utils.Converter;

@ConverterService
public class MindmapModelToEntity implements Converter.Reversible<MindmapModel, MindmapEntity> {

    public MindmapModelToEntity() {
    }

    /**
     * Convert an MindmapModel to MindmapEntity.
     */
    @Override
    public MindmapEntity convert(final MindmapModel from) {
        return new MindmapEntity(from.getId(), from.getFullmaptext(), from.getName(), from.getIspublic());
    }

    /**
     * Convert an MindmapEntity to MindmapModel.
     */
    @Override
    public MindmapModel revertConvert(final MindmapEntity from) {
        return new MindmapModel(from.id, from.fullmaptext, from.name, from.ispublic, null, null);
    }
}
