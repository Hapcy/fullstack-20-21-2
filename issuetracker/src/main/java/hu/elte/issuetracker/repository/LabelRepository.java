package hu.elte.issuetracker.repository;

import hu.elte.issuetracker.model.Label;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabelRepository extends CrudRepository<Label, Integer> {
    Iterable<Label> findTop10ByTextContains(String text);

    Optional<Label> findOneByTextEqualsIgnoreCase(String text);
}
