package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.UserMapsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserMapsRepository extends JpaRepository<UserMapsModel, Integer> {
}
