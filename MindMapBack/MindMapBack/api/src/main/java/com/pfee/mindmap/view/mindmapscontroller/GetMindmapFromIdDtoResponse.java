package com.pfee.mindmap.view.mindmapscontroller;

public class GetMindmapFromIdDtoResponse {

    public String mindmap;
    public String error;

    public GetMindmapFromIdDtoResponse(final String mindmap, final String error) {
        this.mindmap = mindmap;
        this.error = error;
    }
}
