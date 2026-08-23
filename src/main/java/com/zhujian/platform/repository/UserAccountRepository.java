package com.zhujian.platform.repository;

import com.zhujian.platform.entity.UserAccount;
import com.zhujian.platform.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);
    long countByRole(UserRole role);
}
