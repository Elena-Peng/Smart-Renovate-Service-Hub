package com.zhujian.platform.repository;

import com.zhujian.platform.entity.ProviderLead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderLeadRepository extends JpaRepository<ProviderLead, Long> {
    List<ProviderLead> findByProviderIdOrProviderIsNullOrderByMatchScoreDesc(Long providerId);
    long countByStatus(String status);
}
