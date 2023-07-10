CREATE TABLE users_wallet (
    id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
    owner VARCHAR(50) NOT NULL UNIQUE,
    debit VARCHAR(50) NOT NULL,
    credit VARCHAR(50) NOT NULL,
    balance VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(50) NOT NULL UNIQUE,
    transaction_type VARCHAR(50) NOT NULL,
    create_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    INDEX idx_users_wallet (id, owner)
)