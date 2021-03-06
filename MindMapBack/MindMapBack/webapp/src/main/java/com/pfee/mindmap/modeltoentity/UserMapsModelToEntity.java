package com.pfee.mindmap.modeltoentity;

import com.pfee.mindmap.domain.entity.UserMapsEntity;
import com.pfee.mindmap.persistence.model.UserMapsModel;
import scope.ConverterService;
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
     * Convert an UserMapsModel to UserMapsEntity.
     */
    @Override
    public UserMapsEntity convert(final UserMapsModel from) {
        return new UserMapsEntity(from.getId(), userModelToEntity.convert(from.getUser()), mindmapModelToEntity.convert(from.getMap()), from.getUserRole());
    }

    /**
     * Convert an UserMapsEntity to UserMapsModel.
     */
    @Override
    public UserMapsModel revertConvert(final UserMapsEntity from) {
        return new UserMapsModel(from.id, userModelToEntity.revertConvert(from.user), mindmapModelToEntity.revertConvert(from.map), from.userRole);
    }

}