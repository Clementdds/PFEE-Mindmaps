package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class GetPrivateMindmapFromUrlDtoResponse {
    public BigInteger nodeid;
    public String fullmap;
    public String error;

    public GetPrivateMindmapFromUrlDtoResponse(final BigInteger nodeid, final String fullmap, final String error) {
        this.nodeid = nodeid;
        this.fullmap = fullmap;
        this.error = error;
    }

    public GetPrivateMindmapFromUrlDtoResponse() {
    }
}
