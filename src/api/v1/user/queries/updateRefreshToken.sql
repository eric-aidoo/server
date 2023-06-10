UPDATE users
    SET refresh_token = ?,
        updated_at = ?
WHERE username = ?