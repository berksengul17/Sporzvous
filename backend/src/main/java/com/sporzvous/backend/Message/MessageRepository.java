package com.sporzvous.backend.Message;

import com.sporzvous.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository  extends JpaRepository<Message, Long> {
    Optional<List<Message>> findByReceiver(User receiver);
    Optional<List<Message>> findBySenderAndReceiver(User sender, User receiver);
    @Query("SELECT m FROM Message m WHERE (m.sender = :user1 AND m.receiver = :user2) OR (m.sender = :user2 AND m.receiver = :user1)")
    List<Message> findMessagesBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);
}
