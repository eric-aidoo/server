CREATE TABLE deposits (
    id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
    user VARCHAR(16) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    initiated_by VARCHAR(16) NOT NULL UNIQUE,
    source VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    payment_rail VARCHAR(50) NOT NULL,
    settlement_schedule VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(50) NOT NULL UNIQUE,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    INDEX idx_user_deposits_ledger (id, transaction_id)
)