package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Bookmark {
    @Id
    @SequenceGenerator(
            name = "bookmark_sequence",
            sequenceName = "bookmark_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bookmark_id_seq"
    )
    private long id;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime dateBookmark;
    private Boolean status;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Member member;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Post bookmarkPost;
}
