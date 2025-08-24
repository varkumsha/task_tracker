package org.saksoft.saktrack.repository;

import org.saksoft.saktrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);

}
