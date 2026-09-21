package com.rutaexpress.bff.web;

import com.rutaexpress.contracts.dto.MeDto;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bff")
public class MeController {

    @GetMapping("/me")
    public MeDto me(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            List<String> roles = jwt.getClaimAsStringList("roles");
            return new MeDto(jwt.getClaimAsString("name"), roles != null ? roles : List.of());
        }
        return new MeDto(null, List.of());
    }
}
