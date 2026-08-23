package com.zhujian.platform.service;

import com.zhujian.platform.entity.UserAccount;
import com.zhujian.platform.entity.UserRole;
import com.zhujian.platform.repository.UserAccountRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class CurrentUser {
    public static final String SESSION_USER_ID = "zhujian.userId";

    private final UserAccountRepository users;
    private final HttpSession session;

    public CurrentUser(UserAccountRepository users, HttpSession session) {
        this.users = users;
        this.session = session;
    }

    public UserAccount requireLogin() {
        Object value = session.getAttribute(SESSION_USER_ID);
        if (!(value instanceof Long id)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "请先登录");
        }
        return users.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "登录已失效"));
    }

    public UserAccount requireRole(UserRole role) {
        UserAccount user = requireLogin();
        if (user.getRole() != role) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "当前账号无权访问该端");
        }
        return user;
    }
}
