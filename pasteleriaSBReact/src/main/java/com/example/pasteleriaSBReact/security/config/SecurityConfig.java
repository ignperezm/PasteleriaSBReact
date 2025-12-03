package com.example.pasteleriaSBReact.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.pasteleriaSBReact.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    //inyecta nuestro filtro personalizado de jwt
    private final JwtAuthenticationFilter jwtAuthFilter;
    //inyecta el proveedor de autenticacion que configuramos
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            //desactiva la proteccion csrf que no necesitamos en una api rest stateless
            .csrf(csrf -> csrf.disable())
            //define las reglas de autorizacion para las peticiones http
            .authorizeHttpRequests(auth -> auth
                //permite las peticiones options para el preflight de cors
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                //define las rutas publicas que no necesitan autenticacion
                .requestMatchers("/auth/**", "/productos/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                //cualquier otra peticion necesita autenticacion
                .anyRequest().authenticated()
            )
            //configura la gestion de sesiones para que sea sin estado (stateless)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            //establece nuestro proveedor de autenticacion personalizado
            .authenticationProvider(authenticationProvider)
            //añade nuestro filtro de jwt antes del filtro de usuario y contraseña de spring
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
