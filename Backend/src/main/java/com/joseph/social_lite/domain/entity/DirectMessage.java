package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "direct_messeges")
public class DirectMessage {

    @Id
    @SequenceGenerator(
            name = "direct_messeges_sequence",
            sequenceName = "direct_messeges_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "direct_messeges_id_seq"
    )
    private long id;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime dateMessage;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Member from;

    @Column(nullable = false)
    private String message;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Member to;
}
