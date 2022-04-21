package eventmanagementsystembackend.springapplication.event.service;

import eventmanagementsystembackend.springapplication.common.dto.MessageResponse;
import eventmanagementsystembackend.springapplication.common.enums.MessageType;
import eventmanagementsystembackend.springapplication.event.entity.Event;
import eventmanagementsystembackend.springapplication.event.repository.EventRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Collection;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private static final String EVENT_ADDED_MESSAGE = "Event with event name \"%s\" has been added successfully";
    private static final String EVENT_ALREADY_EXISTS_MESSAGE = "Event with event name \"%s\" is already exist!";

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public MessageResponse addEvent(final Event newEvent) {
        if(eventRepository.existsByEventName((newEvent.eventName()))){
            return new MessageResponse(MessageType.ERROR, EVENT_ALREADY_EXISTS_MESSAGE .formatted(newEvent.eventName()));
        }
            eventRepository.save(newEvent);

        return new MessageResponse(MessageType.SUCCESS,eventAddedMessage(newEvent.eventName()));
    }

    private String eventAddedMessage(final String eventName) {
        return EVENT_ADDED_MESSAGE.formatted(eventName);
    }


    public Event getEventByEventName(String eventName) {
        return eventRepository.findByEventName(eventName)
                .orElseThrow(() -> new EntityNotFoundException("Event with event name \"%s\" does not exist!". formatted(eventName)));
    }

    public MessageResponse updateEvent(final String eventName, final Event updatedEvent) {
        Event evenFromDB = eventRepository.findByEventName(eventName)
                .orElseThrow(() -> new EntityNotFoundException("Event with event name \"%s\" does not exist!".formatted(updatedEvent.eventName())));
        evenFromDB.updateEvent(updatedEvent);
        eventRepository.save(evenFromDB);

        return new MessageResponse(MessageType.SUCCESS,"Event with event name \"%s\" has been updated successfully".formatted(eventName));
    }

    public MessageResponse deleteEvent(Long id, String eventName) {
        if(!eventRepository.existsByEventName(eventName)){
            return new MessageResponse(MessageType.ERROR,"Event with event name \"%s\" does not exist!".formatted(eventName));
        }
        eventRepository.deleteById(id);

        return new MessageResponse(MessageType.SUCCESS,"Event with event name \"%s\" has been deleted".formatted(eventName));
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
