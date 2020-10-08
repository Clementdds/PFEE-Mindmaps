package com.mti.mindmap.domain.entity;

public class MindmapEntity {

    public final Integer id;
    public final String fullmaptext;
    public final boolean ispublic;

    public MindmapEntity(final Integer id, final String fullmaptext, final boolean ispublic) {
        this.id = id;
        this.fullmaptext = fullmaptext;
        this.ispublic = ispublic;
    }
}
