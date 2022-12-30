package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Follow {
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
    private boolean status;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime dateFollow;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Member follower;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Member following;


}
