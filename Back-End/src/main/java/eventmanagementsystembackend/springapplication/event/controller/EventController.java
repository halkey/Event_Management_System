package eventmanagementsystembackend.springapplication.event.controller;

import eventmanagementsystembackend.springapplication.common.dto.MessageResponse;
import eventmanagementsystembackend.springapplication.common.enums.MessageType;
import eventmanagementsystembackend.springapplication.event.controller.request.UpdateEventRequest;
import eventmanagementsystembackend.springapplication.event.controller.response.EventQuaryResponse;
import eventmanagementsystembackend.springapplication.event.entity.Event;
import eventmanagementsystembackend.springapplication.event.controller.request.AddEventRequest;
import eventmanagementsystembackend.springapplication.event.service.EventService;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.List;

@RestController
@RequestMapping("/admin-page")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public MessageResponse addEvent(@Valid @RequestBody final AddEventRequest request, BindingResult error){
        System.out.println(request);
        if(error.hasErrors()){

            return new MessageResponse( MessageType.ERROR, error.getAllErrors().get(0).getDefaultMessage());
        }
            return eventService.addEvent(request.toEvent());
    }

    @GetMapping
    public List<EventQuaryResponse> getAllEvents(){
        return eventService.getAllEvents()
                .stream()
                .map(EventQuaryResponse::new)
                .toList();
    }

    @GetMapping("/{eventName}")
    public EventQuaryResponse getEventByEventName(@PathVariable final String eventName){
        Event event = eventService.getEventByEventName(eventName);
        return new EventQuaryResponse(event);
    }


    @PutMapping("/{eventName}")
    public MessageResponse updateEvent(
            @PathVariable String eventName, @RequestBody @Valid UpdateEventRequest request){
        return eventService.updateEvent(eventName, request.toEvent());
    }

    @DeleteMapping("/{id}/{eventName}")
    public MessageResponse deleteEvent(@PathVariable Long id, @PathVariable String eventName){
        return eventService.deleteEvent(id, eventName);
    }
}
