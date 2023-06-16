UPDATE users
    SET phone_number = ?,
        phone_verification_code = ?,
        phone_verification_code_expiration = ?,
        updated_at = ?
WHERE username = ?