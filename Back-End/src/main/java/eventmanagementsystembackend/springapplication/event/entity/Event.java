package eventmanagementsystembackend.springapplication.event.entity;

import eventmanagementsystembackend.springapplication.common.BaseEntity;
import lombok.Getter;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Getter
@Accessors(fluent = true)
public class Event extends BaseEntity {

    private String eventName;
    private LocalDate eventStartDate;
    private LocalDate eventFinishDate;
    private Long quota;

    protected Event(){}

    public Event(String eventName, LocalDate eventStartDate, LocalDate eventFinishDate, Long quota) {
        this.eventName = eventName;
        this.eventStartDate = eventStartDate;
        this.eventFinishDate = eventFinishDate;
        this.quota = quota;
    }

    public void updateEvent(final Event updatedEvent) {
        this.eventName = updatedEvent.eventName();
        this.eventStartDate = updatedEvent.eventStartDate();
        this.eventFinishDate = updatedEvent.eventFinishDate();
        this.quota = updatedEvent.quota();
    }


}
