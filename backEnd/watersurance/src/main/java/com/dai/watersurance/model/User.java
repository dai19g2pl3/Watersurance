package com.dai.watersurance.model;

import com.dai.watersurance.model.audit.UserDateAudit;

import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@SuppressWarnings("serial")
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "email"
        })
})
public class User extends UserDateAudit {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Size(max = 40)
    private String name;

    @NaturalId
    @NotBlank
    @NotNull
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @NotNull
    @Size(max = 100)
    private String password;
    
    @NotNull
    private int nif;
    
    @NotNull
    private int phoneNumber;
    
    @Type(type = "boolean")
    private boolean isActive;
    
    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLogin;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    
    @ManyToOne()
    @JoinColumn(name = "insurer_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Insurer insurer;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user",
			orphanRemoval = true)
	private Set<Contract> contracts = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user",
			orphanRemoval = true)
    private Set<Habitation> habitations = new HashSet<>();
    
    public User() {}

    public User(String name, String email, String password, int nif, int phoneNumber, boolean isActive, Date lastLogin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.nif = nif;
        this.phoneNumber = phoneNumber;
        this.isActive = isActive;
        this.lastLogin = lastLogin;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getNif() {
        return nif;
    }

    public void setNif(int nif) {
        this.nif = nif;
    }
    
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

	public int getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(int phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Insurer getInsurer() {
		return insurer;
	}

	public void setInsurer(Insurer insurer) {
		this.insurer = insurer;
	}
	
	public Set<Contract> getContracts() {
		return contracts;
	}

	public void setContracts(Set<Contract> contracts) {
		this.contracts = contracts;
	}
	
	public Set<Habitation> getHabitations() {
		return habitations;
	}

	public void setHabitations(Set<Habitation> habitations) {
		this.habitations = habitations;
	}
	
	public Long getUserId() {
		return id;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        User that = (User) o;
        return Objects.equals(name, that.name) &&
               Objects.equals(email, that.email) &&
               Objects.equals(password, that.password) &&
               Objects.equals(nif, that.nif) &&
               Objects.equals(phoneNumber, that.phoneNumber) &&
               Objects.equals(isActive, that.isActive) &&
               Objects.equals(lastLogin, that.lastLogin);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(name, email, password, nif, phoneNumber, isActive, lastLogin);
    }
}