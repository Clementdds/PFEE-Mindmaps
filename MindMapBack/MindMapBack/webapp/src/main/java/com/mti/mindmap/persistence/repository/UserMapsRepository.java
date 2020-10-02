package com.mti.mindmap.persistence.repository;

import com.mti.mindmap.persistence.model.UserMapsModel;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface UserMapsRepository extends CrudRepository<UserMapsModel, BigInteger> {
}
