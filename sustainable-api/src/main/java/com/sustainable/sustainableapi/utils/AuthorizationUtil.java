package com.sustainable.sustainableapi.utils;

import com.sustainable.sustainableapi.exceptions.CustomException;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.model.enums.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;


/**
 * Utility class for authorization methods.
 */
public class AuthorizationUtil {

    public static void checkUserIsHimselfOrAdmin(UUID userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        // If user is admin, he is authorized
        if (currentUser.getUserRole().equals(UserRole.ROLE_ADMIN)) return;

        // If user is himself, he is authorized
        if (currentUser.getId().equals(userId)) return;

        // Otherwise, user is not authorized
        throw new CustomException("User is not authorized", HttpStatus.UNAUTHORIZED);
    }
}
