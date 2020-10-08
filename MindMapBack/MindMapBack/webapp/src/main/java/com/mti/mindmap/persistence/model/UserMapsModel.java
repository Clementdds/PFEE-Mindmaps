package com.mti.mindmap.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "usermaps") 
public class UserMapsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userid")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "mapid")
    private MindmapModel map;

    @Column(name = "userrole")
    private Integer userRole;

    public UserMapsModel(final Integer id, final UserModel user, final MindmapModel map, final Integer userRole) {
        this.id = id;
        this.user = user;
        this.map = map;
        this.userRole = userRole;
    }

    public UserMapsModel() {}

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(final UserModel user) {
        this.user = user;
    }

    public MindmapModel getMap() {
        return map;
    }

    public void setMap(final MindmapModel map) {
        this.map = map;
    }

    public Integer getUserRole() {
        return userRole;
    }

    public void setUserRole(final Integer userRole) {
        this.userRole = userRole;
    }
}
