package com.partypeople.backend.domain.global.security;

import com.partypeople.backend.domain.account.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {
    private final User user;

    public UserPrincipal(User user) {
        this.user = user;
    }

    public Long getId() {
        return user.getId();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 사용자 계정이 만료되지 않음을 반환
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.isAccountNonLocked(); // 사용자 계정이 잠기지 않았음을 반환
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 인증 정보의 유효기간이 만료되지 않음을 반환
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled(); // 사용자 계정이 활성화 상태임을 반환
    }
}