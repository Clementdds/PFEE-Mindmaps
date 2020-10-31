package com.pfee.mindmap.view.userscontroller;

public class SignUpDtoResponse {
    public final String token;
    public final String error;

    public SignUpDtoResponse(final String token, final String error) {
        this.token = token;
        this.error = error;
    }
}
