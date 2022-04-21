package eventmanagementsystembackend.springapplication.user.controller.request;


import eventmanagementsystembackend.springapplication.user.entity.UserEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.*;

@RequiredArgsConstructor
@Getter
@ToString
public class AddUserRequest {

    @Size(max = 255, message = "Username can not exceed 255 characters!")
    @NotEmpty(message = "Username can not be empty!")
    private final String userName;

    @Size(max = 255, message = "Password can not exceed 255 characters!")
    @NotEmpty(message = "Password can not be empty!")
    private final String password;

    @Email(message = "E-Mail is invalid!")
    @NotEmpty(message = "E-Mail can not be empty!")
    private final String email;

    @Size(max = 255, message = "Name can not exceed 255 characters!")
    @NotEmpty(message = "Name can not be empty!")
    private final String name;

    @Size(max = 255, message = "Surname can not exceed 255 characters!")
    @NotEmpty(message = "Surname can not be empty!")
    private final String surName;

    private final Long ssn;

    @Size(max = 255, message = "Profession can not exceed 255 characters!")
    @NotEmpty(message = "Profession can not be empty!")
    private String profession;

    private String registeredEvents;

    public UserEntity toUser(){
        return new UserEntity(userName, password, email, name, surName, ssn, profession, registeredEvents);


    }
}
