package com.partypeople.backend.domain.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final StringRequestDTOConverter stringRequestDTOConverter;

    public WebMvcConfig(StringRequestDTOConverter stringRequestDTOConverter) {
        this.stringRequestDTOConverter = stringRequestDTOConverter;
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(stringRequestDTOConverter);
    }
}
