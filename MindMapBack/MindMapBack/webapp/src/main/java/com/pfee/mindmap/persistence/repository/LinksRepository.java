package com.pfee.mindmap.persistence.repository;

import com.pfee.mindmap.persistence.model.LinksModel;
import org.springframework.data.repository.CrudRepository;

public interface LinksRepository extends CrudRepository<LinksModel, Integer> {
}
