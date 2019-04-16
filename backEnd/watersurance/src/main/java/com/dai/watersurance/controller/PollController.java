package com.dai.watersurance.controller;

import com.dai.watersurance.model.*;
import com.dai.watersurance.payload.request.PollRequest;
import com.dai.watersurance.payload.request.VoteRequest;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.payload.response.PagedResponse;
import com.dai.watersurance.payload.response.PollResponse;
import com.dai.watersurance.repository.PollRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.repository.VoteRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;
import com.dai.watersurance.service.PollService;
import com.dai.watersurance.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    @SuppressWarnings("unused")
	@Autowired
    private PollRepository pollRepository;

    @SuppressWarnings("unused")
	@Autowired
    private VoteRepository voteRepository;

    @SuppressWarnings("unused")
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private PollService pollService;

    @SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(PollController.class);

    @GetMapping
    public PagedResponse<PollResponse> getPolls(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getAllPolls(currentUser, page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPoll(@Valid @RequestBody PollRequest pollRequest) {
        Poll poll = pollService.createPoll(pollRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pollId}")
                .buildAndExpand(poll.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Poll Created Successfully"));
    }

    @GetMapping("/{pollId}")
    public PollResponse getPollById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long pollId) {
        return pollService.getPollById(pollId, currentUser);
    }

    @PostMapping("/{pollId}/votes")
    @PreAuthorize("hasRole('USER')")
    public PollResponse castVote(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long pollId,
                         @Valid @RequestBody VoteRequest voteRequest) {
        return pollService.castVoteAndGetUpdatedPoll(pollId, voteRequest, currentUser);
    }
}