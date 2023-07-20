CREATE TABLE wallets (
    id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
    user VARCHAR(50) NOT NULL UNIQUE,
    is_activated VARCHAR(50) NOT NULL,
    is_frozen VARCHAR(50) NOT NULL,
    credit VARCHAR(50) NOT NULL,
    debit VARCHAR(50) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    balance VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(50) NOT NULL UNIQUE,
    transaction_type VARCHAR(50) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    INDEX idx_users_wallet (id, user, created_at, updated_at, is_activated, is_frozen)
)