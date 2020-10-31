package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class PostLinkDtoRequest {

    public Integer idMindmap;
    public BigInteger nodeid;
    public Boolean isPublic;
    public String[] emails;

    public PostLinkDtoRequest(final Integer idMindmap,
                              final BigInteger nodeid,
                              final Boolean isPublic,
                              final String[] emails) {
        this.idMindmap = idMindmap;
        this.nodeid = nodeid;
        this.isPublic = isPublic;
        this.emails = emails;
    }

    public PostLinkDtoRequest() {
    }
}
