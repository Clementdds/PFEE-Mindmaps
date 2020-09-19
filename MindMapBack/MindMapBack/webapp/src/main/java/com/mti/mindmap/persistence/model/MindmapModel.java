package com.mti.mindmap.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mindmaps")
public class MindmapModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fullmaptext", nullable = false, length = 50)
    private String fullmaptext;

    public MindmapModel(final Integer id, final String fullmaptext) {
        this.id = id;
        this.fullmaptext = fullmaptext;
    }

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getFullmaptext() {
        return fullmaptext;
    }

    public void setFullmaptext(final String fullmaptext) {
        this.fullmaptext = fullmaptext;
    }
}
