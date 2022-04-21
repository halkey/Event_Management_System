package eventmanagementsystembackend.springapplication.user.entity;

import eventmanagementsystembackend.springapplication.common.BaseEntity;
import eventmanagementsystembackend.springapplication.event.entity.Event;
import lombok.Getter;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Accessors(fluent = true)
public class UserEntity extends BaseEntity {


    private String userName;
    private String password;
    private String email;
    private String name;
    private String surName;
    private Long ssn;
    private String profession;
    private String registeredEvents;

    protected UserEntity() {

    }

    public UserEntity(String userName, String password, String email, String name, String surName, Long ssn, String profession, String registeredEvents) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surName = surName;
        this.ssn = ssn;
        this.profession = profession;
        this.registeredEvents = registeredEvents;


    }

}
