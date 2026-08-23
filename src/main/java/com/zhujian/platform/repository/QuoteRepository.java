package com.zhujian.platform.repository;

import com.zhujian.platform.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByProviderIdOrderByCreatedAtDesc(Long providerId);
    List<Quote> findByLeadConsultRequestOwnerIdOrderByCreatedAtDesc(Long ownerId);
    long countByValidationStatus(String validationStatus);
}
