CREATE TABLE users_billing_address (
    id VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(2) NOT NULL,
    user VARCHAR(255) NOT NULL,
    INDEX idx_users_billing_address_table (id, user, country)
);