package com.pfee.mindmap.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "This username is taken")
public class UserAlreadyExistsException extends RuntimeException {}
