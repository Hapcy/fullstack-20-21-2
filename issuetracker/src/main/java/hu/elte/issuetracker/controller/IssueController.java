package hu.elte.issuetracker.controller;

import hu.elte.issuetracker.model.Issue;
import hu.elte.issuetracker.model.Label;
import hu.elte.issuetracker.model.Message;
import hu.elte.issuetracker.model.User;
import hu.elte.issuetracker.repository.IssueRepository;
import hu.elte.issuetracker.repository.LabelRepository;
import hu.elte.issuetracker.repository.MessageRepository;
import hu.elte.issuetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private LabelRepository labelRepository;
    private IssueRepository issueRepository;
    private MessageRepository messageRepository;
    private UserRepository userRepository;

    public IssueController(
            @Autowired IssueRepository issueRepository,
            @Autowired MessageRepository messageRepository,
            @Autowired LabelRepository labelRepository,
            @Autowired UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.messageRepository = messageRepository;
        this.labelRepository = labelRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public ResponseEntity<Iterable<Issue>> getIssues(@RequestParam(required = false) String place) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<String> roles = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        if (roles.contains("ROLE_ADMIN")) {
            return ResponseEntity.ok(issueRepository.findAll());
        }

        String username = auth.getName();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getIssues());
        }
        return ResponseEntity.notFound().build();
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

        if (modifyLabels(issue, issue)) return ResponseEntity.badRequest().build();

        Issue savedIssue = issueRepository.save(issue);
        return ResponseEntity.ok(savedIssue);
    }

    @PatchMapping("/{issueId}")
    public ResponseEntity<Issue> modifyIssue(@RequestBody Issue issue, @PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);

        if (!optionalIssue.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Issue issueToModify = optionalIssue.get();

        if (issue.getStatus() != null) {
            issueToModify.setStatus(issue.getStatus());
        }

        if (issue.getTitle() != null) {
            issueToModify.setTitle(issue.getTitle());
        }

        if (issue.getDescription() != null) {
            issueToModify.setDescription(issue.getDescription());
        }

        if (issue.getPlace() != null) {
            issueToModify.setPlace(issue.getPlace());
        }

        if (issue.getLabels() != null) {
            if (modifyLabels(issue, issueToModify)) return ResponseEntity.badRequest().build();
        }

        Issue savedIssue = issueRepository.save(issueToModify);
        return ResponseEntity.ok(savedIssue);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity deleteIssue(@PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);

        if (!optionalIssue.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        issueRepository.deleteById(issueId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{issueId}/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message, @PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);

        if (!optionalIssue.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Issue issue = optionalIssue.get();
        message.setIssue(issue);

        Message createdMessage = messageRepository.save(message);

        return ResponseEntity.ok(createdMessage);
    }

    // return value is true if modification failed
    private boolean modifyLabels(@RequestBody Issue issue, Issue issueToModify) {
        if (issue.getLabels() == null) {
            return true;
        }

        List<Label> labels = new ArrayList<>();
        for (Label label : issue.getLabels()) {
            if (label.getId() == null) {
                return true;
            }
            Optional<Label> oLabel = labelRepository.findById(label.getId());
            if (oLabel.isEmpty()) {
                return true;
            } else {
                labels.add(oLabel.get());
            }
        }
        issueToModify.setLabels(labels);
        return false;
    }
}
