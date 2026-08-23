package com.zhujian.platform.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "consult_request")
public class ConsultRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id")
    private UserAccount owner;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal area;

    @Column(name = "house_type", length = 50)
    private String houseType;

    @Column(name = "decoration_type", length = 50)
    private String decorationType;

    @Column(length = 50)
    private String style;

    @Column(name = "budget_range", length = 50)
    private String budgetRange;

    @Column(name = "move_in_time", length = 50)
    private String moveInTime;

    @Column(length = 500)
    private String needs;

    @Column(nullable = false, length = 30)
    private String status = "SUBMITTED";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public UserAccount getOwner() { return owner; }
    public void setOwner(UserAccount owner) { this.owner = owner; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public BigDecimal getArea() { return area; }
    public void setArea(BigDecimal area) { this.area = area; }
    public String getHouseType() { return houseType; }
    public void setHouseType(String houseType) { this.houseType = houseType; }
    public String getDecorationType() { return decorationType; }
    public void setDecorationType(String decorationType) { this.decorationType = decorationType; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public String getBudgetRange() { return budgetRange; }
    public void setBudgetRange(String budgetRange) { this.budgetRange = budgetRange; }
    public String getMoveInTime() { return moveInTime; }
    public void setMoveInTime(String moveInTime) { this.moveInTime = moveInTime; }
    public String getNeeds() { return needs; }
    public void setNeeds(String needs) { this.needs = needs; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
