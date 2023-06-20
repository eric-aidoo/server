CREATE TABLE waitlist_users (
    invite_code VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
    is_approved_to_test BOOLEAN NOT NULL,
    country_of_residence VARCHAR(2) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    INDEX idx_users_table (email)
);
