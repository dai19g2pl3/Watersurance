package com.dai.watersurance.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;

import com.dai.watersurance.model.audit.UserDateAudit;

@SuppressWarnings("serial")
@Entity
@Table(name = "insurer", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "name"
        })
})
public class Insurer extends UserDateAudit {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false)
	@Size(max = 40)
    private String name;

	public Insurer() {
		
	}
	
	public Insurer(String name) {
		this.name = name;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        Insurer that = (Insurer) o;
        return Objects.equals(name, that.name);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
