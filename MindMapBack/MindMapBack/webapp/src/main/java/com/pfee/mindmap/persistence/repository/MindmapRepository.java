package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.MindmapModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MindmapRepository extends JpaRepository<MindmapModel, Integer> {

}
