package com.mti.mindmap.view.usermapscontroller;

import com.mti.mindmap.view.mindmapscontroller.GetAllMindmapsDtoResponse;

public class GetAllUserMapsDtoResponse {

    public final Iterable<GetAllUserMapsDtoResponse.UserMapsDtoResponse> userMapsList;

    public GetAllUserMapsDtoResponse(final Iterable<GetAllUserMapsDtoResponse.UserMapsDtoResponse> userMapsList) {
        this.userMapsList = userMapsList;
    }

    public static class UserMapsDtoResponse {
        public final Integer id;
        public final UserDtoResponse user;
        public final MindmapDtoResponse map;
        public final Integer userRole;

        public UserMapsDtoResponse(final Integer id,
                                   final UserDtoResponse user,
                                   final MindmapDtoResponse map,
                                   final Integer userRole) {
            this.id = id;
            this.user = user;
            this.map = map;
            this.userRole = userRole;
        }

        public static class UserDtoResponse
        {
            public final Integer id;
            public final String username;
            public final String password;

            public UserDtoResponse(final Integer id, final String username, final String password) {
                this.id = id;
                this.username = username;
                this.password = password;
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
}
