package com.pfee.mindmap.view.linkcontroller;

import java.util.List;

public class PostLinkDtoResponse {

    public String url;
    public String error;
    public List<String> addedEmails;

    public PostLinkDtoResponse(final String url, final String error, final List<String> addedEmails) {
        this.url = url;
        this.error = error;
        this.addedEmails = addedEmails;
    }
}
