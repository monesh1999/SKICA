package com.monesh.Skyca.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileStaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/videos/**")
                .addResourceLocations("file:uploads/videos/");

        registry.addResourceHandler("/uploads/reading/**")
                .addResourceLocations("file:uploads/reading/");

        registry.addResourceHandler("/uploads/reading/thumbnails/**")
                .addResourceLocations("file:uploads/reading/thumbnails/");
    }
}
