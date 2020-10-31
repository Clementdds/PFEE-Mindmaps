package com.pfee.mindmap.view.mindmapscontroller;

public class CreateMindMapDtoResponse {
    public final Integer id;
    public final String error;

    public CreateMindMapDtoResponse(final Integer id, final String error) {
        this.id = id;
        this.error = error;
    }
}
