package com.joseph.social_lite.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "members")
public class Member {
    @Id
    @SequenceGenerator(
            name = "member_sequence",
            sequenceName = "members_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "members_id_seq"
    )
    private long id;
    @Column(columnDefinition = "DATE", nullable = false)
    private LocalDate birth;
    @Column(nullable = false)
    private String fullname;
    @Column(name = "member_join_date",columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime memberJoinDate;
    private String bio;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(name = "phone_number",nullable = false)
    private String phoneNumber;
    @Column(nullable = false)
    private String gender;
    @Column(columnDefinition = "text")
    private String profileImage;

}
