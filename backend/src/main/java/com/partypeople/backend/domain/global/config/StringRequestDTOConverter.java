package com.partypeople.backend.domain.global.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringRequestDTOConverter implements Converter<String, PartyResponseDto> {

    private final ObjectMapper objectMapper;

    public StringRequestDTOConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public PartyResponseDto convert(String source) {
        try {
            return objectMapper.readValue(source, new TypeReference<PartyResponseDto>() {});
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("문자열을 PartyResponseDto로 변환하는데 실패했습니다.", e);
        }
    }
}
