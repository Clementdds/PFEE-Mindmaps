package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class PostLinkDtoRequest {

    public Integer idMindmap;
    public BigInteger nodeid;

    public PostLinkDtoRequest(final Integer idMindmap,
                              final BigInteger nodeid) {
        this.idMindmap = idMindmap;
        this.nodeid = nodeid;
    }

    public PostLinkDtoRequest() {
    }
}
