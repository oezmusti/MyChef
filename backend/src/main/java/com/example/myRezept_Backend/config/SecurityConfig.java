package com.example.myRezept_Backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // CSRF für Entwicklung deaktivieren (für Produktivumgebungen anpassen!)
                .cors() // CORS-Konfiguration verwenden
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/recipes").permitAll() // Zugriff auf diesen Endpunkt erlauben
                        .requestMatchers("/api/users").permitAll()
                        .anyRequest().authenticated() // Alle anderen Endpunkte erfordern Authentifizierung
                );
        return http.build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Erlaube Anfragen von deinem Frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
