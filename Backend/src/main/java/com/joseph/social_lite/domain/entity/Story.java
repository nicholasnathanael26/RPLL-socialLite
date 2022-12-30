package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Story {
    @Id
    @SequenceGenerator(
            name = "story_sequence",
            sequenceName = "story_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "story_id_seq"
    )
    private long id;
    @Column(nullable = false)
    private int duration;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime datePost;
    @Column(nullable = false, columnDefinition = "text")
    private String image;
    private Boolean status;
    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    public Member owner;
}
