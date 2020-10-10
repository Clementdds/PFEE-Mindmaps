package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.UserMapsModel;
import org.springframework.data.repository.CrudRepository;

public interface UserMapsRepository extends CrudRepository<UserMapsModel, Integer> {
}
