package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class PostPublicLinkDtoRequest {

    public Integer idMindmap;
    public BigInteger nodeid;

    public PostPublicLinkDtoRequest(final Integer idMindmap, final BigInteger nodeid) {

        this.idMindmap = idMindmap;
        this.nodeid = nodeid;
    }

    public PostPublicLinkDtoRequest() {
    }
}
