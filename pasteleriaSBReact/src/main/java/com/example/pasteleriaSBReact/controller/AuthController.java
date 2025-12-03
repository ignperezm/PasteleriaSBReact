package com.example.pasteleriaSBReact.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pasteleriaSBReact.dto.AuthRequest;
import com.example.pasteleriaSBReact.dto.AuthResponse;
import com.example.pasteleriaSBReact.dto.RegisterRequest;
import com.example.pasteleriaSBReact.model.Usuario;
import com.example.pasteleriaSBReact.repository.UsuarioRepository;
import com.example.pasteleriaSBReact.security.jwt.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final com.example.pasteleriaSBReact.repository.RoleRepository roleRepository;

    public AuthController(AuthenticationManager authenticationManager, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, com.example.pasteleriaSBReact.repository.RoleRepository roleRepository) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        Usuario u = new Usuario();
        u.setEmail(req.getEmail());
        u.setNombre(req.getNombre());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        String wantedRole = req.getRol() == null ? "USER" : req.getRol();
        com.example.pasteleriaSBReact.model.Role role = roleRepository.findByNombre(wantedRole);
        if (role == null) {
            role = new com.example.pasteleriaSBReact.model.Role();
            role.setNombre(wantedRole);
            role = roleRepository.save(role);
        }
        u.setRole(role);
        Usuario saved = usuarioRepository.save(u);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );
            String token = jwtUtil.generateToken(req.getEmail());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}
