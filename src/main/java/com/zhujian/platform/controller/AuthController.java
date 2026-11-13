package com.zhujian.platform.controller;

import com.zhujian.platform.entity.AccountStatus;
import com.zhujian.platform.entity.UserAccount;
import com.zhujian.platform.entity.UserRole;
import com.zhujian.platform.repository.UserAccountRepository;
import com.zhujian.platform.service.CurrentUser;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserAccountRepository users;
    private final PasswordEncoder passwordEncoder;
    private final CurrentUser currentUser;

    public AuthController(UserAccountRepository users, PasswordEncoder passwordEncoder, CurrentUser currentUser) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.currentUser = currentUser;
    }

    @PostMapping("/register")
    public UserView register(@Valid @RequestBody RegisterRequest request, HttpSession session) {
        if (request.role() == UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "管理员账号不能公开注册");
        }
        if (users.findByUsername(request.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "账号已存在");
        }
        UserAccount user = new UserAccount();
        user.setUsername(request.username());
        user.setDisplayName(request.displayName());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(request.role());
        user.setStatus(AccountStatus.ACTIVE);
        user = users.save(user);
        session.setAttribute(CurrentUser.SESSION_USER_ID, user.getId());
        return UserView.from(user);
    }

    @PostMapping("/login")
    public UserView login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        UserAccount user = users.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "账号或密码错误"));
        if (user.getStatus() != AccountStatus.ACTIVE || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "账号或密码错误");
        }
        session.setAttribute(CurrentUser.SESSION_USER_ID, user.getId());
        return UserView.from(user);
    }

    @GetMapping("/me")
    public UserView me() {
        return UserView.from(currentUser.requireLogin());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session) {
        session.invalidate();
    }

    public record RegisterRequest(
            @NotBlank String username,
            @NotBlank String password,
            @NotBlank String displayName,
            UserRole role
    ) {}

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}

    public record UserView(Long id, String username, String displayName, UserRole role) {
        static UserView from(UserAccount user) {
            return new UserView(user.getId(), user.getUsername(), user.getDisplayName(), user.getRole());
        }
    }
}
