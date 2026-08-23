package com.zhujian.platform.controller;

import com.zhujian.platform.entity.UserRole;
import com.zhujian.platform.repository.*;
import com.zhujian.platform.service.CurrentUser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final CurrentUser currentUser;
    private final UserAccountRepository users;
    private final ConsultRequestRepository consults;
    private final ProviderLeadRepository leads;
    private final QuoteRepository quotes;
    private final ProjectOrderRepository orders;

    public AdminController(CurrentUser currentUser, UserAccountRepository users,
                           ConsultRequestRepository consults, ProviderLeadRepository leads,
                           QuoteRepository quotes, ProjectOrderRepository orders) {
        this.currentUser = currentUser;
        this.users = users;
        this.consults = consults;
        this.leads = leads;
        this.quotes = quotes;
        this.orders = orders;
    }

    @GetMapping("/dashboard/overview")
    public Map<String, Object> overview() {
        currentUser.requireRole(UserRole.ADMIN);
        return Map.of(
                "users", users.count(),
                "owners", users.countByRole(UserRole.OWNER),
                "providers", users.countByRole(UserRole.PROVIDER),
                "consultRequests", consults.count(),
                "pendingLeads", leads.countByStatus("PENDING"),
                "quotes", quotes.count(),
                "orders", orders.count(),
                "pendingOrders", orders.countByStatus("PENDING_CONSULT")
        );
    }

    @GetMapping("/orders")
    public Object orders() {
        currentUser.requireRole(UserRole.ADMIN);
        return orders.findAll().stream().map(order -> Map.of(
                "id", order.getId(),
                "orderCode", order.getOrderCode(),
                "status", order.getStatus(),
                "stage", order.getCurrentStage(),
                "progress", order.getProgress()
        )).toList();
    }
}
