package com.pfee.mindmap.view.userscontroller;

public class GetAllUserDtoResponse {

    public final Iterable<GetAllUserDtoResponse.UserDtoResponse> userList;

    public GetAllUserDtoResponse(final Iterable<UserDtoResponse> userList) {
        this.userList = userList;
    }

    public static class UserDtoResponse {
        public final Integer id;
        public final String username;
        public final String password;

        public UserDtoResponse(final Integer id, final String username, final String password) {
            this.id = id;
            this.username = username;
            this.password = password;
        }
    }

}
