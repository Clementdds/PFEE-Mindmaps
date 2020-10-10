package com.pfee.mindmap.domain.entity;

/**
 * @author thomas.curti(thomas.curti @ epita.fr)
 * @since 1.0
 */

public class UserEntity {

    public final Integer id;
    public final String username;
    public final String password;

    public UserEntity(final Integer id, final String username, final String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

}
