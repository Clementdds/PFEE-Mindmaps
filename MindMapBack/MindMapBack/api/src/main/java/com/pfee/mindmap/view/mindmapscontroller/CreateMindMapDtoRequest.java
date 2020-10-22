package com.pfee.mindmap.view.mindmapscontroller;

public class CreateMindMapDtoRequest {
    public String text;
    public String name;

    public CreateMindMapDtoRequest(final String text, final String name) {
        this.text = text;
        this.name = name;
    }

    public CreateMindMapDtoRequest(){}
}
