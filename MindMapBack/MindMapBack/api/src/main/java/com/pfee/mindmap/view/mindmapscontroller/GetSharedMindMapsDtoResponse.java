package com.pfee.mindmap.view.mindmapscontroller;

public class GetSharedMindMapsDtoResponse {

    public final Iterable<GetSharedMindMapsDtoResponse.MindmapDtoResponse> mindmapsList;
    public final String error;

    public GetSharedMindMapsDtoResponse(final Iterable<GetSharedMindMapsDtoResponse.MindmapDtoResponse> mindmapsList,
                                       final String error) {
        this.mindmapsList = mindmapsList;
        this.error = error;
    }

    public static class MindmapDtoResponse {
        public final Integer id;
        public final String name;
        public final boolean isPublic;

        public MindmapDtoResponse(final Integer id, final String name, final boolean isPublic) {
            this.id = id;
            this.name = name;
            this.isPublic = isPublic;
        }
    }
}
