package com.simple.crud_server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {
    private S3Client s3Client;

    public S3Service(S3Client s3Client){
        this.s3Client = s3Client;
    }

    public void uploadFile(MultipartFile file) throws IOException {

        UUID uuid = UUID.randomUUID();
        s3Client.putObject(PutObjectRequest.builder().bucket("dsic").key(uuid.toString())
                .build(),
                RequestBody.fromBytes(file.getBytes()));
        System.out.println("파일 업로드 성공");

    }
    public void uploadText(String str) throws IOException {

        UUID uuid = UUID.randomUUID();
        s3Client.putObject(PutObjectRequest.builder().bucket("dsic").key(uuid.toString())
                        .build(),
                RequestBody.fromString(str));
        System.out.println("파일 업로드 성공");

    }

}
