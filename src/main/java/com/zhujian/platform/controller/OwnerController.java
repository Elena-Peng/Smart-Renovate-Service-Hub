package com.zhujian.platform.controller;

import com.zhujian.platform.entity.ConsultRequest;
import com.zhujian.platform.entity.Quote;
import com.zhujian.platform.entity.UserAccount;
import com.zhujian.platform.entity.UserRole;
import com.zhujian.platform.repository.ConsultRequestRepository;
import com.zhujian.platform.repository.QuoteRepository;
import com.zhujian.platform.service.CurrentUser;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {
    private final ConsultRequestRepository consults;
    private final QuoteRepository quotes;
    private final CurrentUser currentUser;

    public OwnerController(ConsultRequestRepository consults, QuoteRepository quotes, CurrentUser currentUser) {
        this.consults = consults;
        this.quotes = quotes;
        this.currentUser = currentUser;
    }

    @PostMapping("/consult-requests")
    public ConsultView createConsult(@Valid @RequestBody ConsultRequestPayload payload) {
        UserAccount owner = currentUser.requireRole(UserRole.OWNER);
        ConsultRequest request = new ConsultRequest();
        request.setOwner(owner);
        request.setCity(payload.city());
        request.setArea(payload.area());
        request.setHouseType(payload.houseType());
        request.setDecorationType(payload.decorationType());
        request.setStyle(payload.style());
        request.setBudgetRange(payload.budgetRange());
        request.setMoveInTime(payload.moveInTime());
        request.setNeeds(payload.needs());
        return ConsultView.from(consults.save(request));
    }

    @GetMapping("/consult-requests")
    public List<ConsultView> myConsults() {
        UserAccount owner = currentUser.requireRole(UserRole.OWNER);
        return consults.findByOwnerIdOrderByCreatedAtDesc(owner.getId()).stream().map(ConsultView::from).toList();
    }

    @GetMapping("/quotes")
    public List<QuoteView> myQuotes() {
        UserAccount owner = currentUser.requireRole(UserRole.OWNER);
        return quotes.findByLeadConsultRequestOwnerIdOrderByCreatedAtDesc(owner.getId()).stream().map(QuoteView::from).toList();
    }

    public record ConsultRequestPayload(
            @NotBlank String city,
            @DecimalMin("1") BigDecimal area,
            String houseType,
            String decorationType,
            String style,
            String budgetRange,
            String moveInTime,
            String needs
    ) {}

    public record ConsultView(Long id, String city, BigDecimal area, String decorationType, String style, String status) {
        static ConsultView from(ConsultRequest request) {
            return new ConsultView(request.getId(), request.getCity(), request.getArea(), request.getDecorationType(), request.getStyle(), request.getStatus());
        }
    }

    public record QuoteView(Long id, String quoteCode, BigDecimal totalAmount, String validationStatus, String status) {
        static QuoteView from(Quote quote) {
            return new QuoteView(quote.getId(), quote.getQuoteCode(), quote.getTotalAmount(), quote.getValidationStatus(), quote.getStatus());
        }
    }
}
