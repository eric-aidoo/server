CREATE TABLE users (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    lockout_duration VARCHAR(50),
    login_attempts INTEGER,
    is_email_verified BOOLEAN NOT NULL,
    is_phone_verified BOOLEAN NOT NULL,
    is_id_verified BOOLEAN NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    middle_name VARCHAR(150), 
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL UNIQUE,
    country_of_residence VARCHAR(2) NOT NULL,
    date_of_birth VARCHAR(20),
    authorization_pin VARCHAR(255),
    phone_number VARCHAR(20),
    refresh_token TEXT,
    otp_code VARCHAR(6),
    otp_code_expiration VARCHAR(50),
    email_verification_code VARCHAR(6),
    email_verification_code_expiration VARCHAR(50),
    avatar VARCHAR(255),
    identification_document_type TEXT,
    front_image_of_document TEXT,
    back_image_of_document TEXT,
    selfie TEXT,
    ssn VARCHAR(9),
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    consents JSON NOT NULL,
    INDEX idx_users_table (id, username, email)
);

