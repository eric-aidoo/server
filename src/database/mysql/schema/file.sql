CREATE TABLE s3_bucket (
    id VARCHAR(30) NOT NULL PRIMARY KEY,
    encoded_string LONGBLOB NOT NULL,
    file_size VARCHAR(30) NOT NULL,
    file_type VARCHAR(10) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    created_at VARCHAR(60) NOT NULL,
    updated_at VARCHAR(60) NOT NULL,
    INDEX idx_s3_bucket_table (id)
)
