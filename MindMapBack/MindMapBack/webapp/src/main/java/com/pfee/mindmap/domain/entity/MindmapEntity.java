package com.pfee.mindmap.domain.entity;

public class MindmapEntity {

    public final Integer id;
    public final String fullmaptext;
    public final String name;
    public final boolean ispublic;

    public MindmapEntity(final Integer id, final String fullmaptext, final String name, final boolean ispublic) {
        this.id = id;
        this.fullmaptext = fullmaptext;
        this.name = name;
        this.ispublic = ispublic;
    }
}
