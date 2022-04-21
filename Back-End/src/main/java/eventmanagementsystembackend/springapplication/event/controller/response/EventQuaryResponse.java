package eventmanagementsystembackend.springapplication.event.controller.response;


import eventmanagementsystembackend.springapplication.event.entity.Event;
import lombok.Getter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
public class EventQuaryResponse {

    private final String eventName;
    private final LocalDate eventStartDate;
    private final LocalDate eventFinishDate;
    private final Long quota;
    private final Long id;

    public EventQuaryResponse(final Event event) {
        this.eventName = event.eventName();
        this.eventStartDate = event.eventStartDate();
        this.eventFinishDate = event.eventFinishDate();
        this.quota = event.quota();
        this.id = event.id();
    }
}
