package com.mti.mindmap.persistence.repository;

import com.mti.mindmap.persistence.model.UserMapsModel;
import org.springframework.data.repository.CrudRepository;

public interface UserMapsRepository extends CrudRepository<UserMapsModel, Integer> {
}
