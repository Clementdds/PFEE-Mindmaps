package com.pfee.mindmap.view.mindmapscontroller;

public class GetMindmapDtoRequest {
    public Integer id;
    public String url;

    public GetMindmapDtoRequest(final Integer id, final String url) {
        this.id = id;
        this.url = url;
    }

    public GetMindmapDtoRequest() {

    }
}
