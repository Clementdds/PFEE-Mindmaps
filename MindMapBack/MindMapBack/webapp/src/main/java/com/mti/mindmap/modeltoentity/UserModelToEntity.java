package com.mti.mindmap.modeltoentity;

import com.mti.mindmap.domain.entity.UserEntity;
import com.mti.mindmap.persistence.model.UserModel;
import com.mti.rpg.utils.scope.ConverterService;
import utils.Converter;

/**
 * @author thomas.curti(thomas.curti @ epita.fr)
 * @since 1.0
 */

@ConverterService
public class UserModelToEntity implements Converter.Reversible<UserModel, UserEntity> {

    public UserModelToEntity() {
    }
    /**
     * Convert an UserModel to UserEntity.
     */
    @Override
    public UserEntity convert(final UserModel from) {
        return new UserEntity(from.getId(), from.getUsername(), from.getPassword());
    }

    /**
     * Convert an UserEntity to UserModel.
     */
    @Override
    public UserModel revertConvert(final UserEntity from) {
        return new UserModel(from.id, from.username, from.password, null);
    }

}
