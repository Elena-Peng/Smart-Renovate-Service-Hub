package com.zhujian.platform.config;

import com.zhujian.platform.entity.UserAccount;
import com.zhujian.platform.entity.UserRole;
import com.zhujian.platform.repository.UserAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedDemoAccounts(UserAccountRepository users, PasswordEncoder encoder) {
        return args -> {
            createIfMissing(users, encoder, "owner_demo", "陈先生", UserRole.OWNER);
            createIfMissing(users, encoder, "provider_demo", "观筑设计", UserRole.PROVIDER);
            createIfMissing(users, encoder, "admin_demo", "平台管理员", UserRole.ADMIN);
        };
    }

    private void createIfMissing(UserAccountRepository users, PasswordEncoder encoder,
                                 String username, String displayName, UserRole role) {
        if (users.findByUsername(username).isPresent()) return;
        UserAccount user = new UserAccount();
        user.setUsername(username);
        user.setDisplayName(displayName);
        user.setPasswordHash(encoder.encode("123456"));
        user.setRole(role);
        users.save(user);
    }
}
