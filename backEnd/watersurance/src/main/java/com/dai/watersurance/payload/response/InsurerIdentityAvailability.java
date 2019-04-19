package com.dai.watersurance.payload.response;

public class InsurerIdentityAvailability {
	private Boolean available;

    public InsurerIdentityAvailability(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}

