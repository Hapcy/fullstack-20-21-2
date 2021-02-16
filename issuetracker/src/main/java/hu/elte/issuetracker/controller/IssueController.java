package hu.elte.issuetracker.controller;

import hu.elte.issuetracker.model.Issue;
import hu.elte.issuetracker.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private IssueRepository issueRepository;

    public IssueController(@Autowired IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    @GetMapping("")
    public ResponseEntity<Iterable<Issue>> getIssues() {
        Iterable<Issue> issues;

        issues = issueRepository.findAll();

        return ResponseEntity.ok(issues);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssue(@PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isPresent()) {
            return ResponseEntity.ok(optionalIssue.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        issue.setStatus(Issue.Status.NEW);
        Issue savedIssue = issueRepository.save(issue);
        return ResponseEntity.ok(savedIssue);
    }

}
