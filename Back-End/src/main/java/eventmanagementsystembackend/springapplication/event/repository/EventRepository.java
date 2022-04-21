package eventmanagementsystembackend.springapplication.event.repository;

import eventmanagementsystembackend.springapplication.event.entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository <Event, Long> {

    boolean existsByEventName(String eventName);

    Optional<Event> findByEventName(String eventName);



}
