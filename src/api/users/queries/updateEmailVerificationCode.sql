UPDATE users
    SET email_verification_code = ?,
        email_verification_code_expiration = ?,
        updated_at = ?
WHERE username = ?