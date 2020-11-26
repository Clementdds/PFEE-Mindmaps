package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class GetPrivateMindmapFromUrlDtoResponse {
    public BigInteger nodeid;
    public String name;
    public String fullmap;
    public String error;

    public GetPrivateMindmapFromUrlDtoResponse(final BigInteger nodeid, final String name, final String fullmap, final String error) {
        this.nodeid = nodeid;
        this.name = name;
        this.fullmap = fullmap;
        this.error = error;
    }

    public GetPrivateMindmapFromUrlDtoResponse() {
    }
}
