package com.pfee.mindmap.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "mindmaps")
public class MindmapModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fullmaptext", nullable = false, length = 65536)
    private String fullmaptext;

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Column(name = "ispublic", nullable = false)
    private boolean ispublic;

    @OneToMany
    @JoinColumn(name = "mapid")
    private Set<UserMapsModel> usermaps;

    @OneToMany
    @JoinColumn(name = "mindmapid")
    private Set<LinksModel> links;

    public MindmapModel(final Integer id,
                        final String fullmaptext,
                        final String name,
                        final boolean ispublic,
                        final Set<UserMapsModel> usermaps, final Set<LinksModel> links) {
        this.id = id;
        this.fullmaptext = fullmaptext;
        this.name = name;
        this.ispublic = ispublic;
        this.usermaps = usermaps;
        this.links = links;
    }

    public MindmapModel() {}

    public Set<LinksModel> getLinks() {
        return links;
    }

    public void setLinks(final Set<LinksModel> links) {
        this.links = links;
    }

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

    public String getFullmaptext() {
        return fullmaptext;
    }

    public void setFullmaptext(final String fullmaptext) {
        this.fullmaptext = fullmaptext;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public boolean getIspublic() {return ispublic;}

    public void setIspublic(final boolean ispublic) {this.ispublic = ispublic;}
}
