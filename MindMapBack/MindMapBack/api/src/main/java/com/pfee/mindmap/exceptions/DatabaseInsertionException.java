package com.pfee.mindmap.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Error during database insertion")
public class DatabaseInsertionException extends RuntimeException {}
