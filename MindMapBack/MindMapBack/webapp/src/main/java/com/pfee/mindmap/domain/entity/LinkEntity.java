package com.pfee.mindmap.domain.entity;

public class LinkEntity {

    public final Integer id;
    public final Integer nodeid;
    public final MindmapEntity map;
    public final String url;

    public LinkEntity(final Integer id, final Integer nodeid, final MindmapEntity map, final String url) {
        this.id = id;
        this.nodeid = nodeid;
        this.map = map;
        this.url = url;
    }
}
