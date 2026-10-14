package com.example.myfullstackapp;

import com.example.myfullstackapp.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class MyFullstackApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyFullstackApplication.class, args);
    }
}
