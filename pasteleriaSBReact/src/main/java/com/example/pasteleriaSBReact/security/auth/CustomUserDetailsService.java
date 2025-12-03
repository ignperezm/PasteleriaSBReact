package com.example.pasteleriaSBReact.security.auth;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.example.pasteleriaSBReact.repository.UsuarioRepository;
import com.example.pasteleriaSBReact.model.Usuario;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario u = usuarioRepository.findByEmail(username);
        if (u == null) throw new UsernameNotFoundException("Usuario no encontrado");
        String roleName = "USER";
        if (u.getRole() != null && u.getRole().getNombre() != null) roleName = u.getRole().getNombre();
        return User.builder()
            .username(u.getEmail())
            .password(u.getPassword())
            .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roleName)))
            .build();
    }
}
