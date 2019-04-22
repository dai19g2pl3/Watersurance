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

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import com.dai.watersurance.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name = "insured_object")
public class InsuredObject extends UserDateAudit {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false)
	private double price;
	
	@Column(nullable = false, length = 40)
	private String ref;
	
	@Column(nullable = false, length = 40)
	private String description;
	
	@Type(type = "boolean")
	private boolean wasInsured;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "habitation_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Habitation habitation;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(nullable = true, name = "occurrence_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Occurrence occurrence;
	
	
	public InsuredObject() {}
	
	public InsuredObject(Long id, double price, String ref, String description) {
		this.id = id;
		this.price = price;
		this.ref = ref;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getRef() {
		return ref;
	}

	public void setRef(String ref) {
		this.ref = ref;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        InsuredObject that = (InsuredObject) o;
        return Objects.equals(price, that.price) &&
        	   Objects.equals(ref, that.ref) &&
        	   Objects.equals(description, that.description);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(price, ref, description);
    }
}
