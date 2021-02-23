package hu.elte.issuetracker.repository;

import hu.elte.issuetracker.model.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Integer> {
    Iterable<Issue> findAllByPlaceContains(String place);
}
