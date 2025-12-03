package com.example.pasteleriaSBReact.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    //inyecta la clave secreta desde application.properties
    @Value("${jwt.secret}")
    private String jwtSecret;

    //inyecta el tiempo de expiracion desde application.properties
    @Value("${jwt.expiration}")
    private Long jwtExpirationMs;

    //genera una clave de firma para el token a partir del secreto
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    //metodo para generar un nuevo token jwt
    public String generateToken(String username, List<String> roles) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                //establece el 'subject' del token (el nombre de usuario)
                .setSubject(username)
                //añade los roles como una 'claim' personalizada
                .claim("roles", roles)
                //establece la fecha de emision
                .setIssuedAt(now)
                //establece la fecha de expiracion
                .setExpiration(expiry)
                //firma el token con la clave y el algoritmo hs256
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                //construye el string del token
                .compact();
    }

    //obtiene el nombre de usuario desde un token
    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    //valida si un token es correcto y no ha expirado
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            //si hay cualquier excepcion (token malformado, expirado, etc), no es valido
            return false;
        }
    }

    //metodo privado para obtener todas las claims de un token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
