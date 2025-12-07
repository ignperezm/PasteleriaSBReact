package com.example.pasteleriaSBReact.security.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.pasteleriaSBReact.model.Role;
import com.example.pasteleriaSBReact.model.Usuario;
import com.example.pasteleriaSBReact.repository.RoleRepository;
import com.example.pasteleriaSBReact.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        //verificamos si ya existe un rol admin
        if (roleRepository.findByNombre("ADMIN") == null) {
            roleRepository.save(new Role(null, "ADMIN"));
        }

        //verificamos si ya existe un rol user
        if (roleRepository.findByNombre("USER") == null) {
            roleRepository.save(new Role(null, "USER"));
        }

        //verificamos si ya existe un usuario admin
        if (usuarioRepository.findByRole_Nombre("ADMIN").isEmpty()) {
            Role adminRole = roleRepository.findByNombre("ADMIN");

            var adminUser = Usuario.builder()
                .nombre("Admin")
                .email("admin@test.com")
                .password(passwordEncoder.encode("admin123"))
                .role(adminRole)
                .build();

            usuarioRepository.save(adminUser);
            System.out.println(">>>>>>>> Creado usuario administrador por defecto: admin@test.com | pass: admin123");
        }
    }
}
