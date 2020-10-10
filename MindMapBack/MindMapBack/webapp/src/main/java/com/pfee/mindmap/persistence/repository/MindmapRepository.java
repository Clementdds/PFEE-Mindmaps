package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.MindmapModel;
import org.springframework.data.repository.CrudRepository;

public interface MindmapRepository extends CrudRepository<MindmapModel, Integer> {
}
