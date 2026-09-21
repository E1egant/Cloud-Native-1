package com.rutaexpress.contracts.dto;

import java.util.List;

/**
 * Identidad del usuario autenticado y sus roles (extraídos del JWT).
 */
public record MeDto(String name, List<String> roles) {
}
