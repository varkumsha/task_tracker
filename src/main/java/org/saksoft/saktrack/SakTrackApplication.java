package org.saksoft.saktrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "org.saksoft.saktrack")
public class SakTrackApplication {

    public static void main(String[] args) {
        SpringApplication.run(SakTrackApplication.class, args);
    }

}
