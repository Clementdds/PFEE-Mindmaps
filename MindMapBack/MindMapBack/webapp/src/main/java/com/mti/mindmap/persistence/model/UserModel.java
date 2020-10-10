package com.mti.mindmap.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * @author thomas.curti(thomas.curti @ epita.fr)
 * @since 1.0
 */
@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", nullable = false, length = 255)
    private String username;

    @Column(name = "password", nullable = false, length = 2048)
    private String password;

    @OneToMany
    @JoinColumn(name = "userid")
    private Set<UserMapsModel> usermaps;

    public UserModel(final Integer id,
                     final String username,
                     final String password,
                     final Set<UserMapsModel> usermaps) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.usermaps = usermaps;
    }

    public UserModel() {}

    public Set<UserMapsModel> getUsermaps() {
        return usermaps;
    }

    public void setUsermaps(final Set<UserMapsModel> usermaps) {
        this.usermaps = usermaps;
    }

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}
