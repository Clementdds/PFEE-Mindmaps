package com.pfee.mindmap.domain.entity;

import java.math.BigInteger;

public class LinkEntity {

    public final Integer id;
    public final BigInteger nodeid;
    public final MindmapEntity map;
    public final String url;

    public LinkEntity(final Integer id, final BigInteger nodeid, final MindmapEntity map, final String url) {
        this.id = id;
        this.nodeid = nodeid;
        this.map = map;
        this.url = url;
    }
}
