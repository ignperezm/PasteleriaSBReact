package com.example.pasteleriaSBReact.security;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pasteleriaSBReact.dto.AuthRequest;
import com.example.pasteleriaSBReact.dto.AuthResponse;
import com.example.pasteleriaSBReact.dto.RegisterRequest;
import com.example.pasteleriaSBReact.model.Role;
import com.example.pasteleriaSBReact.model.Usuario;
import com.example.pasteleriaSBReact.repository.RoleRepository;
import com.example.pasteleriaSBReact.repository.UsuarioRepository;
import com.example.pasteleriaSBReact.security.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        String roleName = (request.getRol() == null || request.getRol().isEmpty()) ? "USER" : request.getRol();
        Role userRole = roleRepository.findByNombre(roleName);
        
        if (userRole == null) {
            userRole = roleRepository.save(new Role(null, roleName));
        }

        var user = Usuario.builder()
            .nombre(request.getNombre())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(userRole)
            .build();

        usuarioRepository.save(user);

        var jwtToken = jwtUtil.generateToken(user.getEmail(), user.getNombre(), List.of(user.getRole().getNombre()));
        return AuthResponse.builder().token(jwtToken).build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        var user = usuarioRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        var jwtToken = jwtUtil.generateToken(user.getEmail(), user.getNombre(), List.of(user.getRole().getNombre()));
        return AuthResponse.builder().token(jwtToken).build();
    }
}
