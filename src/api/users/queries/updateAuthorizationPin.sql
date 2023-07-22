UPDATE users
    SET authorization_pin = ?,
        updated_at = ?
WHERE username = ?