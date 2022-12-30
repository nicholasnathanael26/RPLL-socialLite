package com.joseph.social_lite.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CommentDto {
    @JsonProperty("comment")
    private String comment;
    @JsonProperty("dateComment")
    private LocalDateTime dateComment;
    @JsonProperty("username")
    private String username;
}
