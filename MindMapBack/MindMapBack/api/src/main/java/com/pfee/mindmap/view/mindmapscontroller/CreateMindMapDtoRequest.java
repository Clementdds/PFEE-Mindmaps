package com.pfee.mindmap.view.mindmapscontroller;

public class CreateMindMapDtoRequest {
    public String text;
    public String name;
    public boolean isPublic;

    public CreateMindMapDtoRequest(final String text, final String name, final boolean isPublic) {
        this.text = text;
        this.name = name;
        this.isPublic = isPublic;
    }

    public CreateMindMapDtoRequest(){}
}
