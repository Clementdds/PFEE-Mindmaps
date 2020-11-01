package com.pfee.mindmap.view.mindmapscontroller;

public class GetMindmapDtoResponse {

    public String mindmap;
    public String error;

    public GetMindmapDtoResponse(final String mindmap, final String error) {
        this.mindmap = mindmap;
        this.error = error;
    }
}
