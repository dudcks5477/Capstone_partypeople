package com.partypeople.backend.domain.party.entity;

import com.partypeople.backend.domain.account.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.sun.istack.NotNull;
import org.apache.commons.io.FilenameUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import javax.persistence.*;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Party {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String place;

    //@NotNull
    //private int coin;

    @NotNull
    private String content;

    @ManyToMany
    private List<User> participants;

    @Transient
    private MultipartFile imageFile;

    private String imageName;

    public void uploadImageFile() throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
            String fileExtension = FilenameUtils.getExtension(fileName);
            String generatedFileName = UUID.randomUUID().toString() + "." + fileExtension;
            String uploadDir = "src/main/resources"; // 이미지 업로드 디렉토리 경로

            File uploadDirPath = new File(uploadDir);
            if (!uploadDirPath.exists()) {
                uploadDirPath.mkdirs();
            }

            File uploadedFile = new File(uploadDir + File.separator + generatedFileName);
            imageFile.transferTo(uploadedFile);

            this.imageName = generatedFileName;
        }


    }

}