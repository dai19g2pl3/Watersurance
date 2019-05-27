package com.dai.watersurance.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.dai.watersurance.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name = "habitation") 
public class Habitation extends UserDateAudit {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotBlank
	@Column(nullable = false, length = 80)
	private String address;
	
	@NotBlank
	@Column(nullable = false, length = 80)
	private String zipCode;
	
	@Column(nullable = false, length = 2)
	private int sensorQtd;

	@ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;	
	
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "habitation",
			orphanRemoval = true)
	private Set<Occurrence> occurrences = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "habitation",
			orphanRemoval = true)
	private Set<InsuredObject> insuredObjects = new HashSet<>();
	
	public Habitation() {}
	
	public Habitation(String address, String zipCode, int sensorQtd, User user) {
		this.address = address;
		this.zipCode = zipCode;
		this.sensorQtd = sensorQtd;
		this.user = user;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	public int getSensorQtd() {
		return sensorQtd;
	}

	public void setSensorQtd(int sensorQtd) {
		this.sensorQtd = sensorQtd;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getUserId() {
		return user.getId();
	}
	
	public Set<Occurrence> getOccurrences() {
		return occurrences;
	}

	public void setOccurrences(Set<Occurrence> occurrences) {
		this.occurrences = occurrences;
	}

	public Set<InsuredObject> getInsuredObjects() {
		return insuredObjects;
	}

	public void setInsuredObjects(Set<InsuredObject> insuredObjects) {
		this.insuredObjects = insuredObjects;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        Habitation that = (Habitation) o;
        return Objects.equals(address, that.address) &&
               Objects.equals(zipCode, that.zipCode) &&
               Objects.equals(sensorQtd, that.sensorQtd);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(address, zipCode, sensorQtd);
    }
}
