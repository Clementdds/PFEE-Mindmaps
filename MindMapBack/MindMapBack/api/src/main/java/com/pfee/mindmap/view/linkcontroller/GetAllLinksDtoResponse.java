package com.pfee.mindmap.view.linkcontroller;

import java.math.BigInteger;

public class GetAllLinksDtoResponse {

    public final Iterable<GetAllLinksDtoResponse.LinksDtoResponse> linksList;

    public GetAllLinksDtoResponse(final Iterable<GetAllLinksDtoResponse.LinksDtoResponse> linksList) {
        this.linksList = linksList;
    }

    public static class LinksDtoResponse {
        public final Integer id;
        public final BigInteger nodeid;
        public final MindmapDtoResponse map;
        public final String url;

        public LinksDtoResponse(final Integer id,
                                final BigInteger nodeid,
                                final MindmapDtoResponse map, final String url) {
            this.id = id;
            this.nodeid = nodeid;
            this.map = map;
            this.url = url;
        }
    }

    public static class MindmapDtoResponse
    {
        public final Integer id;
        public final String fullmaptext;

        public MindmapDtoResponse(final Integer id, final String fullmaptext) {
            this.id = id;
            this.fullmaptext = fullmaptext;
        }
    }
}
