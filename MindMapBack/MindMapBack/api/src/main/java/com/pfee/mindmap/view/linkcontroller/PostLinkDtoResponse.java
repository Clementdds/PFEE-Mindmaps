package com.pfee.mindmap.view.linkcontroller;

import java.util.List;

public class PostLinkDtoResponse {

    public String url;
    public String error;

    public PostLinkDtoResponse(final String url, final String error) {
        this.url = url;
        this.error = error;
    }
}
