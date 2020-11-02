package com.pfee.mindmap.view.mindmapscontroller;

public class ShareMindMapDtoRequest {
    public final Integer mapId;
    public final Iterable<String> emails;

    public ShareMindMapDtoRequest(final Integer mapId, final Iterable<String> emails) {
        this.mapId = mapId;
        this.emails = emails;
    }
}
