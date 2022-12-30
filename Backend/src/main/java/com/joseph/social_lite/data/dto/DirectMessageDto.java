package com.joseph.social_lite.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DirectMessageDto {
    @JsonProperty("from")
    private long from;
    @JsonProperty("to")
    private long to;
    @JsonProperty("message")
    private String message;
}
