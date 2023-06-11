CREATE TABLE users_address (
    id VARCHAR(30) NOT NULL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    street VARCHAR(225) NOT NULL,
    apartment VARCHAR(50),
    city VARCHAR(150) NOT NULL,
    state VARCHAR(150) NOT NULL,
    zip_code VARCHAR(50) NOT NULL,
    country VARCHAR(150) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    updates_trail JSON,
    FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
    INDEX idx_users_address_table (username)
);
