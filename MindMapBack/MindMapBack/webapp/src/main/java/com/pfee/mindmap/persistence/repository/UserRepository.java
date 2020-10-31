package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.domain.entity.UserEntity;
import com.pfee.mindmap.persistence.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;

/**
 * @author thomas.curti(thomas.curti@epita.fr)
 * @since 1.0
 */

/**
 * Repository that discuss with User Table
 */
public interface UserRepository extends JpaRepository<UserModel, Integer> {

    UserModel findByUsername(String username);
}
