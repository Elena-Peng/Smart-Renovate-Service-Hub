package com.zhujian.platform.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "provider_lead")
public class ProviderLead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lead_code", nullable = false, unique = true, length = 30)
    private String leadCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "consult_request_id")
    private ConsultRequest consultRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private UserAccount provider;

    @Column(name = "match_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal matchScore = BigDecimal.ZERO;

    @Column(nullable = false, length = 30)
    private String status = "PENDING";

    @Column(name = "response_deadline")
    private LocalDateTime responseDeadline;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public String getLeadCode() { return leadCode; }
    public void setLeadCode(String leadCode) { this.leadCode = leadCode; }
    public ConsultRequest getConsultRequest() { return consultRequest; }
    public void setConsultRequest(ConsultRequest consultRequest) { this.consultRequest = consultRequest; }
    public UserAccount getProvider() { return provider; }
    public void setProvider(UserAccount provider) { this.provider = provider; }
    public BigDecimal getMatchScore() { return matchScore; }
    public void setMatchScore(BigDecimal matchScore) { this.matchScore = matchScore; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getResponseDeadline() { return responseDeadline; }
    public void setResponseDeadline(LocalDateTime responseDeadline) { this.responseDeadline = responseDeadline; }
}
