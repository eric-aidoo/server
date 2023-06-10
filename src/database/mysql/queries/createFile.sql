INSERT INTO s3_bucket
(
    id,
    encoded_string, 
    file_size, 
    file_type,
    original_name, 
    created_at, 
    updated_at
)
VALUES (?, ?, ?, ?, ?, ?, ?);