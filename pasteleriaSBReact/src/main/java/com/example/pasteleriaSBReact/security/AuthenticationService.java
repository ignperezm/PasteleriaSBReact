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

    //inyecta las dependencias necesarias para el servicio
    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    //metodo para registrar un nuevo usuario
    public AuthResponse register(RegisterRequest request) {
        //asigna user por defecto si no se especifica un rol
        String roleName = (request.getRol() == null || request.getRol().isEmpty()) ? "USER" : request.getRol();
        Role userRole = roleRepository.findByNombre(roleName);
        
        //si el rol no existe en la bd, lo crea
        if (userRole == null) {
            userRole = roleRepository.save(new Role(null, roleName));
        }

        //crea un nuevo objeto usuario con los datos del request
        var user = Usuario.builder()
            .nombre(request.getNombre())
            .email(request.getEmail())
            //cifra la contraseña antes de guardarla
            .password(passwordEncoder.encode(request.getPassword()))
            .role(userRole)
            .build();

        //guarda el nuevo usuario en la base de datos
        usuarioRepository.save(user);

        //genera un token jwt para el usuario recien creado
        var jwtToken = jwtUtil.generateToken(user.getEmail(), List.of(user.getRole().getNombre()));
        //devuelve el token en la respuesta
        return AuthResponse.builder().token(jwtToken).build();
    }

    //metodo para autenticar un usuario existente
    public AuthResponse authenticate(AuthRequest request) {
        //usa el authenticationmanager de spring para validar las credenciales
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        //si la autenticacion es exitosa, busca al usuario en la bd
        var user = usuarioRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        //genera un token jwt para el usuario autenticado
        var jwtToken = jwtUtil.generateToken(user.getEmail(), List.of(user.getRole().getNombre()));
        //devuelve el token en la respuesta
        return AuthResponse.builder().token(jwtToken).build();
    }
}
