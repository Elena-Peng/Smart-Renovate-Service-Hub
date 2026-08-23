package com.zhujian.platform.repository;

import com.zhujian.platform.entity.ProjectOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectOrderRepository extends JpaRepository<ProjectOrder, Long> {
    List<ProjectOrder> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);
    List<ProjectOrder> findByProviderIdOrderByCreatedAtDesc(Long providerId);
    long countByStatus(String status);
}
