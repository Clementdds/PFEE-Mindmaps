package com.mti.mindmap.modeltoentity;

import com.mti.mindmap.domain.entity.UserMapsEntity;
import com.mti.mindmap.persistence.model.UserMapsModel;
import com.mti.rpg.utils.scope.ConverterService;
import utils.Converter;

@ConverterService
public class UserMapsModelToEntity implements Converter.Reversible<UserMapsModel, UserMapsEntity> {

    private final UserModelToEntity userModelToEntity;
    private final MindmapModelToEntity mindmapModelToEntity;

    public UserMapsModelToEntity(final UserModelToEntity userModelToEntity,
                                 final MindmapModelToEntity mindmapModelToEntity) {
        this.userModelToEntity = userModelToEntity;
        this.mindmapModelToEntity = mindmapModelToEntity;
    }
    /**
     * Convert an AccountModel to AccountEntity.
     */
    @Override
    public UserMapsEntity convert(final UserMapsModel from) {
        return new UserMapsEntity(from.getId(), userModelToEntity.convert(from.getUser()), mindmapModelToEntity.convert(from.getMap()), from.getUserRole());
    }

    /**
     * Convert an AccountEntity to AccountModel.
     */
    @Override
    public UserMapsModel revertConvert(final UserMapsEntity from) {
        return new UserMapsModel(from.id, userModelToEntity.revertConvert(from.user), mindmapModelToEntity.revertConvert(from.map), from.userRole);
    }

}