package com.pfee.mindmap.view.linkcontroller;

public class PostPublicLinkDtoResponse {

    public String url;
    public String error;

    public PostPublicLinkDtoResponse(final String url, final String error) {
        this.url = url;
        this.error = error;
    }
}
