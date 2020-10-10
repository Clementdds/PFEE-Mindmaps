package com.pfee.mindmap.domain.entity;

public class UserMapsEntity {

    public final Integer id;
    public final UserEntity user;
    public final MindmapEntity map;
    public final Integer userRole;

    public UserMapsEntity(final Integer id, final UserEntity user, final MindmapEntity map, final Integer userRole) {
        this.id = id;
        this.user = user;
        this.map = map;
        this.userRole = userRole;
    }
}
