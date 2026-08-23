package com.zhujian.platform.repository;

import com.zhujian.platform.entity.ConsultRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultRequestRepository extends JpaRepository<ConsultRequest, Long> {
    List<ConsultRequest> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);
}
