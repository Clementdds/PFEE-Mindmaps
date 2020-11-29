package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class GetPublicMindmapFromUrlDtoResponse {
    public BigInteger nodeid;
    public String name;
    public String fullmap;
    public String error;

    public GetPublicMindmapFromUrlDtoResponse(final BigInteger nodeid, final String name, final String fullmap, final String error) {
        this.nodeid = nodeid;
        this.name = name;
        this.fullmap = fullmap;
        this.error = error;
    }

    public GetPublicMindmapFromUrlDtoResponse() {
    }
}
