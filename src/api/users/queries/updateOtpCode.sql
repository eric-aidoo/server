UPDATE users
    SET otp_code = ?,
        otp_code_expiration = ?,
        updated_at = ?
WHERE username = ?