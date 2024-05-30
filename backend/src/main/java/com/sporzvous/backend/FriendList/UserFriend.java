//package com.sporzvous.backend.FriendList;
//
//import com.sporzvous.backend.User.User;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class UserFriend {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @ManyToOne
//    @JoinColumn(name = "user_id_1")
//    private User user1;
//    @ManyToOne
//    @JoinColumn(name = "user_id_2")
//    private User user2;
//}
