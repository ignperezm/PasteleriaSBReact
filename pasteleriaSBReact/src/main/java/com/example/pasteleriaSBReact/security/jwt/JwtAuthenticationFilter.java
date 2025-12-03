package com.example.pasteleriaSBReact.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
//este filtro se ejecuta una vez por cada peticion
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //obtiene el encabezado 'authorization' de la peticion
        final String header = request.getHeader("Authorization");

        //si el encabezado no existe o no empieza con 'bearer ', se sigue con el siguiente filtro
        if (!StringUtils.hasText(header) || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        //extrae el token del encabezado (quitando el 'bearer ')
        final String token = header.substring(7);
        
        //valida el token usando nuestro jwtutil
        if (jwtUtil.validateToken(token)) {
            //si es valido, obtiene el nombre de usuario del token
            String username = jwtUtil.getUsernameFromToken(token);
            //carga los detalles del usuario desde la base de datos
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            //si el token es valido, se establece la autenticacion en el contexto de seguridad
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        
        //continua con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
