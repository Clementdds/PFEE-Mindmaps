package com.pfee.mindmap.view.userscontroller;

public class LogInDtoResponse {
    public final String token;
    public final String error;

    public LogInDtoResponse(final String token, final String error) {
        this.token = token;
        this.error = error;
    }
}
