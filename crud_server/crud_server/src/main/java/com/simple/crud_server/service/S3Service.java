package com.simple.crud_server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    private S3Client s3Client;

    public S3Service(S3Client s3Client){
        this.s3Client = s3Client;
    }

    public void uploadFile(){

        s3Client.putObject(PutObjectRequest.builder().bucket("dsic").key("test_image")
                .build(),
                RequestBody.fromString("sdk-java 테스트 dsic"));
        System.out.println("파일 업로드 성공");

    }

}
