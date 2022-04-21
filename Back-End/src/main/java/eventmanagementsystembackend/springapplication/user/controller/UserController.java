package eventmanagementsystembackend.springapplication.user.controller;

import eventmanagementsystembackend.springapplication.common.dto.MessageResponse;
import eventmanagementsystembackend.springapplication.common.enums.MessageType;
import eventmanagementsystembackend.springapplication.user.controller.request.AddUserRequest;
import eventmanagementsystembackend.springapplication.user.controller.response.UserQuaryResponse;
import eventmanagementsystembackend.springapplication.user.entity.UserEntity;
import eventmanagementsystembackend.springapplication.user.service.UserService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/login-page")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public MessageResponse addUser(@Valid @RequestBody final AddUserRequest request, BindingResult error) {
        System.out.println(request);
        if (error.hasErrors()) {

            return new MessageResponse(MessageType.ERROR, error.getAllErrors().get(0).getDefaultMessage());
        }
        return userService.addUser(request.toUser());
    }

    @GetMapping
    public List<UserQuaryResponse> getAllUser() {
        return UserService.getAllUsers()
                .stream()
                .map(UserQuaryResponse::new)
                .toList();
    }

    @GetMapping("/{userName}")
    public UserQuaryResponse getUserByUserName(@PathVariable final String userName) {
        UserEntity userEntity = userService.getUserByUserName(userName);
        return new UserQuaryResponse(userEntity);
    }

    @DeleteMapping("/{id}/{userName}")
    public MessageResponse deleteUser(@PathVariable Long id, @PathVariable String userName) {
        return userService.deleteUser(id, userName);
    }
}
