package com.partypeople.backend.domain.global.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import com.partypeople.backend.domain.party.dto.PartyDto;

@Component
public class StringRequestDTOConverter extends Throwable implements Converter<String, PartyDto> { //Throwable 인터페이스. String -> BoothDTO 타입변환

    ObjectMapper objectMapper = new ObjectMapper(); //JSON 객체를 deserialization하기 위한 클래스
    PartyDto partyDto; //역직렬화 시킬 클래스

    public StringRequestDTOConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public PartyDto convert(String source) {
        try{
            partyDto = objectMapper.readValue(source, new TypeReference<PartyDto>() { // 변환할 대상 , BoothDTO 클래스 타입으로 변환 후 레퍼런스 반환
            });
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }
        return partyDto;
    }
}
