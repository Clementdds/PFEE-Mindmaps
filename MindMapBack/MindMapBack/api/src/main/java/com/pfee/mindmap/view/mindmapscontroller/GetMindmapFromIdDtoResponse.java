package com.pfee.mindmap.view.mindmapscontroller;

public class GetMindmapFromIdDtoResponse {

    public String name;
    public String mindmap;
    public String error;

    public GetMindmapFromIdDtoResponse(final String name, final String mindmap, final String error) {
        this.name = name;
        this.mindmap = mindmap;
        this.error = error;
    }
}
