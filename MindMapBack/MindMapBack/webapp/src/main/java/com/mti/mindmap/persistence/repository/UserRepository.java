package com.mti.mindmap.persistence.repository;

import com.mti.mindmap.persistence.model.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

/**
 * @author thomas.curti(thomas.curti@epita.fr)
 * @since 1.0
 */

/**
 * Repository that discuss with User Table
 */
public interface UserRepository extends CrudRepository<UserModel, BigInteger> {
}
