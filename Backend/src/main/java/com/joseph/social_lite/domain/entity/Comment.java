package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Comment {
    @Id
    @SequenceGenerator(
            name = "comment_sequence",
            sequenceName = "comment_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "comment_id_seq"
    )
    private long id;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime dateComment;

    @Column(nullable = false)
    private String comment;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Member from;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Post commentedPost;

}
