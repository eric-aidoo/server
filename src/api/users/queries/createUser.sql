INSERT INTO users (
    id,
    type,
    role,
    status,
    first_name,
    middle_name,
    last_name,
    email,
    password,
    username,
    country_of_residence,
    is_email_verified,
    is_phone_verified,
    is_id_verified,
    created_at,
    updated_at,
    consents
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);