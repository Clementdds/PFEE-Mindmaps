package com.mti.mindmap.domain.entity;

public class MindmapEntity {

    public final Integer id;
    public final String fullmaptext;

    public MindmapEntity(final Integer id, final String fullmaptext) {
        this.id = id;
        this.fullmaptext = fullmaptext;
    }
}
