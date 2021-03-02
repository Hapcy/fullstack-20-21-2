package hu.elte.issuetracker.controller;

import hu.elte.issuetracker.model.Label;
import hu.elte.issuetracker.repository.LabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/labels")
public class LabelController {

    private LabelRepository labelRepository;

    public LabelController(@Autowired LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    @GetMapping("")
    public Iterable<Label> getLabels(@RequestParam Optional<String> text) {
        Iterable<Label> labels;
        if (text.isPresent()) {
            labels = labelRepository.findTop10ByTextContains(text.get());
        } else {
            labels = labelRepository.findTop10ByTextContains("");
        }
        return labels;
    }

    @PostMapping("")
    public ResponseEntity<Label> createLabel(@RequestBody Label label) {
        Optional<Label> oLabel = labelRepository.findOneByTextEqualsIgnoreCase(label.getText());
        if (oLabel.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(oLabel.get());
        }
        Label createdLabel = labelRepository.save(label);
        return ResponseEntity.ok(createdLabel);
    }
}
