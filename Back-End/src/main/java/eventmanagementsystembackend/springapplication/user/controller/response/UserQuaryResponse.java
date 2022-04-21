package eventmanagementsystembackend.springapplication.user.controller.response;


import eventmanagementsystembackend.springapplication.user.entity.UserEntity;
import lombok.Getter;

@Getter
public class UserQuaryResponse {

    private Long id;
    private String userName;
    private String password;
    private String email;
    private String name;
    private String surName;
    private Long ssn;
    private String profession;
    private String registeredEvents;

    public UserQuaryResponse(final UserEntity userEntity) {
        this.userName = userEntity.userName();
        this.password = userEntity.password();
        this.email = userEntity.email();
        this.name = userEntity.name();
        this.surName = userEntity.surName();
        this.ssn = userEntity.ssn();
        this.profession = userEntity.profession();
        this.registeredEvents = userEntity.registeredEvents();
        this.id = userEntity.id();
    }
}
