package com.mti.mindmap.modeltoentity;

import com.mti.mindmap.domain.entity.MindmapEntity;
import com.mti.mindmap.persistence.model.MindmapModel;
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
        return new MindmapEntity(from.getId(), from.getFullmaptext(), from.getIspublic());
    }

    /**
     * Convert an MindmapEntity to MindmapModel.
     */
    @Override
    public MindmapModel revertConvert(final MindmapEntity from) {
        return new MindmapModel(from.id, from.fullmaptext, from.ispublic, null, null);
    }
}
