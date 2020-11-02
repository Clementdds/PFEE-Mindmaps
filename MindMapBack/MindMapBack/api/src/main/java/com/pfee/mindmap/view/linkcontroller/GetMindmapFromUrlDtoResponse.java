package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class GetMindmapFromUrlDtoResponse {
    public BigInteger nodeid;
    public String fullmap;
    public String error;

    public GetMindmapFromUrlDtoResponse(final BigInteger nodeid, final String fullmap, final String error) {
        this.nodeid = nodeid;
        this.fullmap = fullmap;
        this.error = error;
    }

    public GetMindmapFromUrlDtoResponse() {
    }
}
