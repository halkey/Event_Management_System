package eventmanagementsystembackend.springapplication.common.dto;

import eventmanagementsystembackend.springapplication.common.enums.MessageType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MessageResponse {
    private final MessageType messageResponse;
    private final String message;
}
