UPDATE users
    SET login_attempts = ?,
        updated_at = ?
WHERE username = ?