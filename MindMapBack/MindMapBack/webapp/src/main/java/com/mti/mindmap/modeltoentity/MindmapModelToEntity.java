package com.mti.mindmap.modeltoentity;

import com.mti.mindmap.domain.entity.MindmapEntity;
import com.mti.mindmap.persistence.model.MindmapModel;
import com.mti.rpg.utils.scope.ConverterService;
import utils.Converter;

@ConverterService
public class MindmapModelToEntity implements Converter.Reversible<MindmapModel, MindmapEntity> {

    public MindmapModelToEntity() {
    }

    /**
     * Convert an AccountModel to AccountEntity.
     */
    @Override
    public MindmapEntity convert(final MindmapModel from) {
        return new MindmapEntity(from.getId(), from.getFullmaptext());
    }

    /**
     * Convert an AccountEntity to AccountModel.
     */
    @Override
    public MindmapModel revertConvert(final MindmapEntity from) {
        return new MindmapModel(from.id, from.fullmaptext);
    }
}
