CREATE TABLE waitlist (
    id VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    is_allowed_to_test BOOLEAN,
    invite_code VARCHAR(20) NOT NULL
);