package com.dai.watersurance.model;

import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.dai.watersurance.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name = "occurrence")
public class Occurrence extends UserDateAudit {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
	
	@Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;
	
	@Column(nullable = false)
	private double price;
	
	@ManyToOne(optional = false)
    @JoinColumn(name = "habitation_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Habitation habitation;
	
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "occurrence",
			orphanRemoval = true)
	private Set<InsuredObject> insuredObjects = new HashSet<>();

	public Occurrence() {}
	
	public Occurrence(Date startDate, Date endDate, Habitation habitation, 
			double price, Set<InsuredObject> insuredObjects) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.habitation = habitation;
		this.price = price;
		this.insuredObjects = insuredObjects;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	public Habitation getHabitation() {
		return habitation;
	}

	public void setHabitation(Habitation habitation) {
		this.habitation = habitation;
	}

	public Set<InsuredObject> getInsuredObjects() {
		return insuredObjects;
	}

	public void setInsuredObjects(Set<InsuredObject> insuredObjects) {
		this.insuredObjects = insuredObjects;
	}
	
	public void addInsuredObject(InsuredObject insuredObject) {
		this.insuredObjects.add(insuredObject);
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        Occurrence that = (Occurrence) o;
        return Objects.equals(startDate, that.startDate) &&
        	   Objects.equals(endDate, that.endDate);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(startDate, endDate);
    }
}
