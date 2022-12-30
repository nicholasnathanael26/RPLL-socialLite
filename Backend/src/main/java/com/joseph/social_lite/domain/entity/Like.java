package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "like_post")
public class Like {
    @Id
    @SequenceGenerator(
            name = "like_sequence",
            sequenceName = "like_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "like_id_seq"
    )
    private long id;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime dateLike;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Member from;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Post likedPost;

    private boolean status;
}
