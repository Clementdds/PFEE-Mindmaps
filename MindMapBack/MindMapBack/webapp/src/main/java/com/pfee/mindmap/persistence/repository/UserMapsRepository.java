package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.UserMapsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMapsRepository extends JpaRepository<UserMapsModel, Integer> {
    long deleteByMapId(Integer mapId);
}
