package com.mti.mindmap.view.mindmapscontroller;

public class GetAllMindmapsDtoResponse {

    public final Iterable<GetAllMindmapsDtoResponse.MindmapDtoResponse> mindmapsList;

    public GetAllMindmapsDtoResponse(final Iterable<MindmapDtoResponse> mindmapsList) {
        this.mindmapsList = mindmapsList;
    }

    public static class MindmapDtoResponse {
        public final Integer id;
        public final String fullmaptext;
        public final boolean ispublic;

        public MindmapDtoResponse(final Integer id, final String fullmaptext, final boolean ispublic) {
            this.id = id;
            this.fullmaptext = fullmaptext;
            this.ispublic = ispublic;
        }
    }
}
