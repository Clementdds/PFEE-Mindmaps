package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.UserModel;
import org.springframework.data.repository.CrudRepository;

/**
 * @author thomas.curti(thomas.curti@epita.fr)
 * @since 1.0
 */

/**
 * Repository that discuss with User Table
 */
public interface UserRepository extends CrudRepository<UserModel, Integer> {
}
