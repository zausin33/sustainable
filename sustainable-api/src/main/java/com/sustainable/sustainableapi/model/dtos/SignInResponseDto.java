package com.sustainable.sustainableapi.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInResponseDto {
    private String token;
    private UserDto user;
}
