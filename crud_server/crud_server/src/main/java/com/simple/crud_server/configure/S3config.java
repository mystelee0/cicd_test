package com.simple.crud_server.configure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.services.s3.S3Client;
@Configuration
public class S3config {

    @Bean
    public S3Client s3Client(){
        return S3Client.builder().httpClientBuilder(ApacheHttpClient.builder()).build();
    }
}
