package com.zhujian.platform.controller;

import com.zhujian.platform.entity.ProviderLead;
import com.zhujian.platform.entity.Quote;
import com.zhujian.platform.entity.UserAccount;
import com.zhujian.platform.entity.UserRole;
import com.zhujian.platform.repository.ProviderLeadRepository;
import com.zhujian.platform.repository.QuoteRepository;
import com.zhujian.platform.service.CurrentUser;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {
    private final ProviderLeadRepository leads;
    private final QuoteRepository quotes;
    private final CurrentUser currentUser;

    public ProviderController(ProviderLeadRepository leads, QuoteRepository quotes, CurrentUser currentUser) {
        this.leads = leads;
        this.quotes = quotes;
        this.currentUser = currentUser;
    }

    @GetMapping("/leads")
    public List<LeadView> leads() {
        UserAccount provider = currentUser.requireRole(UserRole.PROVIDER);
        return leads.findByProviderIdOrProviderIsNullOrderByMatchScoreDesc(provider.getId())
                .stream().map(LeadView::from).toList();
    }

    @PostMapping("/leads/{id}/accept")
    @Transactional
    public LeadView accept(@PathVariable Long id) {
        UserAccount provider = currentUser.requireRole(UserRole.PROVIDER);
        ProviderLead lead = leads.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "线索不存在"));
        if (lead.getProvider() != null && !lead.getProvider().getId().equals(provider.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "线索已被其他服务商接单");
        }
        if (!"PENDING".equals(lead.getStatus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "当前线索状态不可接单");
        }
        lead.setProvider(provider);
        lead.setStatus("ACCEPTED");
        return LeadView.from(leads.save(lead));
    }

    @GetMapping("/quotes")
    public List<QuoteView> quotes() {
        UserAccount provider = currentUser.requireRole(UserRole.PROVIDER);
        return quotes.findByProviderIdOrderByCreatedAtDesc(provider.getId()).stream().map(QuoteView::from).toList();
    }

    @PostMapping("/quotes")
    @Transactional
    public QuoteView createQuote(@Valid @RequestBody QuotePayload payload) {
        UserAccount provider = currentUser.requireRole(UserRole.PROVIDER);
        ProviderLead lead = leads.findById(payload.leadId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "线索不存在"));
        if (lead.getProvider() == null || !lead.getProvider().getId().equals(provider.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "只能为自己接单的线索报价");
        }
        if (!"ACCEPTED".equals(lead.getStatus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "线索尚未进入报价阶段");
        }
        Quote quote = new Quote();
        quote.setQuoteCode("BJ-" + System.currentTimeMillis() % 1_000_000);
        quote.setLead(lead);
        quote.setProvider(provider);
        quote.setTotalAmount(payload.totalAmount());
        quote.setNote(payload.note());
        quote.setValidationStatus(payload.totalAmount().compareTo(BigDecimal.ONE) >= 0 ? "PASS" : "REVIEW");
        quote.setStatus("SUBMITTED");
        lead.setStatus("QUOTED");
        leads.save(lead);
        return QuoteView.from(quotes.save(quote));
    }

    public record LeadView(Long id, String leadCode, BigDecimal matchScore, String status, Long consultId) {
        static LeadView from(ProviderLead lead) {
            return new LeadView(lead.getId(), lead.getLeadCode(), lead.getMatchScore(), lead.getStatus(), lead.getConsultRequest().getId());
        }
    }

    public record QuotePayload(@NotNull Long leadId, @NotNull @DecimalMin("1") BigDecimal totalAmount, String note) {}

    public record QuoteView(Long id, String quoteCode, BigDecimal totalAmount, String validationStatus, String status) {
        static QuoteView from(Quote quote) {
            return new QuoteView(quote.getId(), quote.getQuoteCode(), quote.getTotalAmount(), quote.getValidationStatus(), quote.getStatus());
        }
    }
}
