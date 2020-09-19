package com.mti.mindmap.persistence.repository;

import com.mti.mindmap.persistence.model.MindmapModel;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface MindmapRepository extends CrudRepository<MindmapModel, BigInteger> {
}
