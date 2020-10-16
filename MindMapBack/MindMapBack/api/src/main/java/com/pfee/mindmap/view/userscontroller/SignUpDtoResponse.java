package com.pfee.mindmap.view.userscontroller;

public class SignUpDtoResponse {
    public final String token;
    public final String error;

    public SignUpDtoResponse(String token, String error) {
        this.token = token;
        this.error = error;
    }
}
