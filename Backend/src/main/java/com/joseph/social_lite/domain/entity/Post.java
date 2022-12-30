package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Post {
    @Id
    @SequenceGenerator(
            name = "post_sequence",
            sequenceName = "post_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "post_id_seq"
    )
    private long id;
    @Column(nullable = false, columnDefinition = "text")
//    @Lob
    private String image;
    private String filename;
    @Column(nullable = false)
    private String caption;
    private int countComment = 0;
    private int countLike = 0;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime datePost;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Member owner;
}
