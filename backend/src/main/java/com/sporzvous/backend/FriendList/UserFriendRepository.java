//package com.sporzvous.backend.FriendList;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface UserFriendRepository extends JpaRepository<UserFriend, Long>{
//
//    @Query("SELECT uf FROM UserFriend uf WHERE uf.user1.userId = :userId OR uf.user2.userId = :userId")
//    List<UserFriend> getFriends(@Param("userId") Long userId);
//
//    @Query("SELECT CASE WHEN COUNT(uf) > 0 THEN true ELSE false END FROM UserFriend uf " +
//            "WHERE (uf.user1.userId = :userId1 AND uf.user2.userId = :userId2) OR " +
//            "(uf.user1.userId = :userId2 AND uf.user2.userId = :userId1)")
//    boolean isAlreadyFriends(Long user1, Long user2);
//}
