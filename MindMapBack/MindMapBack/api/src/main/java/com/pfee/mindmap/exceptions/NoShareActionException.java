package com.pfee.mindmap.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "The mindmap was not shared. Given users may not exist, or they may already have access to the resource.")
public class NoShareActionException extends RuntimeException {}
