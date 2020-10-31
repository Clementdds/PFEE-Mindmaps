package com.pfee.mindmap.view.userscontroller;

public class SignUpDtoRequest {
    public final String email;
    public final String password;

    public SignUpDtoRequest(final String email, final String password) {
        this.email = email;
        this.password = password;
    }
}
