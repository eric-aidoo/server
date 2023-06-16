INSERT INTO users (
    id,
    type,
    role,
    status,
    is_email_verified,
    is_phone_verified,
    first_name,
    middle_name,
    last_name,
    email,
    password,
    username,
    country_of_residence,
    created_at,
    updated_at,
    tos_acceptance
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

