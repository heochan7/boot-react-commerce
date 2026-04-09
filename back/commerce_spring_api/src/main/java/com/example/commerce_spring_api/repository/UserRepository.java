package com.example.commerce_spring_api.repository;

import com.example.commerce_spring_api.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}
