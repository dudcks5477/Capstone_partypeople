package com.partypeople.backend.domain.account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
public class User {
    @Id
    private String id;

    private String name;

    private String email;

    private String password;

    @Override
    public String toString(){
        return "User{"+
                "id='"+id+'\''+
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
