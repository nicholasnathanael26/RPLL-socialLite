package com.joseph.social_lite.data.repository;

import com.joseph.social_lite.domain.entity.DirectMessage;
import com.joseph.social_lite.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface DirectMessageRepository extends JpaRepository<DirectMessage, Long> {
    @Query("SELECT dm from DirectMessage dm WHERE (dm.from = ?1 and dm.to = ?2) or (dm.from = ?3 and dm.to = ?4) order by dm.dateMessage")
    List<DirectMessage> findDirectMessages(Member from, Member to, Member from2, Member to2);
    ArrayList<DirectMessage> findAllByFrom(Member from);
    ArrayList<DirectMessage> findAllByTo(Member to);
}
