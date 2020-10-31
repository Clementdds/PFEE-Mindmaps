package com.pfee.mindmap.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigInteger;

@Entity
@Table(name = "links")
public class LinksModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nodeid", nullable = true)
    private BigInteger nodeid;

    @ManyToOne
    @JoinColumn(name = "mindmapid", insertable = true, updatable = true)
    private MindmapModel map;

    @Column(name = "url", nullable = false, length = 128)
    private String url;

    public LinksModel(final Integer id, final BigInteger nodeid, final MindmapModel map, final String url) {
        this.id = id;
        this.nodeid = nodeid;
        this.map = map;
        this.url = url;
    }

    public LinksModel() {}

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public BigInteger getNodeid() {
        return nodeid;
    }

    public void setNodeid(final BigInteger nodeid) {
        this.nodeid = nodeid;
    }

    public MindmapModel getMap() {
        return map;
    }

    public void setMap(final MindmapModel map) {
        this.map = map;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(final String url) {
        this.url = url;
    }
}
