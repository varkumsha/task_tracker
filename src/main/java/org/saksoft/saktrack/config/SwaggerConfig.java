package org.saksoft.saktrack.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI flowTrackerOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("FlowTracker API")
                        .description("API documentation for Task Tracking System")
                        .version("v1.0")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));

    }
}
