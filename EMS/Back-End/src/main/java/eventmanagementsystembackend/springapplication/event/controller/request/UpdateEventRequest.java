package eventmanagementsystembackend.springapplication.event.controller.request;

import eventmanagementsystembackend.springapplication.event.entity.Event;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.*;
import java.time.LocalDate;

@RequiredArgsConstructor
@Getter
@ToString
public class UpdateEventRequest {

    @Size(max = 255, message = "Event Name can not exceed 255 characters!")
    @NotEmpty(message = "Event Name can not be empty!")
    private final String eventName;

    @FutureOrPresent(message = "Event Start Date can not be in the past!")
    private final LocalDate eventStartDate;

    @Future(message = "Event Finis Date has to be in the future!")
    private final LocalDate eventFinishDate;

    @Min(value = 1, message = "Quota can not be less than 0")
    private final Long quota;

    public Event toEvent(){
        return new Event(eventName,eventStartDate,eventFinishDate,quota);
    }
}
