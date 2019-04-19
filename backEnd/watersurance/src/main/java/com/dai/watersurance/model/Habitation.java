package com.dai.watersurance.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
	
	public Habitation() {}
	
	public Habitation(String address, String zipCode) {
		this.address = address;
		this.zipCode = zipCode;
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
