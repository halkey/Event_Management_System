package eventmanagementsystembackend.springapplication.user.service;

import eventmanagementsystembackend.springapplication.common.dto.MessageResponse;
import eventmanagementsystembackend.springapplication.common.enums.MessageType;
import eventmanagementsystembackend.springapplication.user.entity.UserEntity;
import eventmanagementsystembackend.springapplication.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private static final String USER_ADDED_MESSAGE = "User with username \" %s \" has been added successfully";
    private static final String USER_ALREADY_EXISTS_MESSAGE = "User with username \" %s \" is already exist!";
    private static UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public MessageResponse addUser(final UserEntity newUserEntity) {
        if (userRepository.existsByUserName((newUserEntity.userName()))) {
            return new MessageResponse(MessageType.ERROR, USER_ALREADY_EXISTS_MESSAGE.formatted(newUserEntity.userName()));
        }
        userRepository.save(newUserEntity);

        return new MessageResponse(MessageType.SUCCESS, userAddedMessage(newUserEntity.userName()));
    }

    private String userAddedMessage(final String userName) {
        return USER_ADDED_MESSAGE.formatted(userName);
    }

    public UserEntity getUserByUserName(String userName) {
        String tempUserName;
        if (!userName.equals("undefined"))
            tempUserName = "User with username \" " + userName + " \" does not exist!";
        else
            tempUserName = "Please Enter an Invalid Username and an Invalid Password";
        return userRepository.findByUserName(userName)
                .orElse(new UserEntity("ERROR", tempUserName, null, null, null, null, null, null));
    }

    public MessageResponse deleteUser(Long id, String userName) {
        if (!userRepository.existsByUserName(userName)) {
            return new MessageResponse(MessageType.ERROR, "User with user name \"%s\" does not exist!".formatted(userName));
        }
        userRepository.deleteById(id);
        System.out.println("silindi");

        return new MessageResponse(MessageType.SUCCESS, "User with user name \"%s\" has been deleted".formatted(userName));
    }

}
