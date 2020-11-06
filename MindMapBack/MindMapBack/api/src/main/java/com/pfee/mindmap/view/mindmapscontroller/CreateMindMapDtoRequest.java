package com.pfee.mindmap.view.mindmapscontroller;

public class CreateMindMapDtoRequest {
    public String text;
    public String name;
    public boolean isPublic;
    public String[] emails;

    public CreateMindMapDtoRequest(final String text,
                                   final String name,
                                   final boolean isPublic,
                                   final String[] emails) {
        this.text = text;
        this.name = name;
        this.isPublic = isPublic;
        this.emails = emails;
    }

    public CreateMindMapDtoRequest() {}
}
