package com.monesh.Skyca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SkycaApplication {

	public static void main(String[] args) {
		System.setProperty("logging.level.org.springframework.security", "DEBUG");
		SpringApplication.run(SkycaApplication.class, args);
	}

}
