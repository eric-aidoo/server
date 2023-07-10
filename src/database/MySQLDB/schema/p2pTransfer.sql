CREATE TABLE p2p_transfer_ledger (
    id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
    amount VARCHAR(50) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    sender VARCHAR(16) NOT NULL UNIQUE,
    recipient VARCHAR(16) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(50) NOT NULL UNIQUE,
    transaction_type VARCHAR(50) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARHCAR(50) NOT NULL,
    INDEX idx_p2p_transfer_ledger (id, transaction_id, sender, recipient)
)