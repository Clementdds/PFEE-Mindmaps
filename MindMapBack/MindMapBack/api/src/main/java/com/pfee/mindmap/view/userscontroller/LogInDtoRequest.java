package com.pfee.mindmap.view.userscontroller;

public class LogInDtoRequest {
    public final String email;
    public final String password;


    public LogInDtoRequest(final String email, final String password) {
        this.email = email;
        this.password = password;
    }
}
