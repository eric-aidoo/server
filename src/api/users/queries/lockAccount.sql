UPDATE users
    SET status = ?,
        lockout_duration = ?,
        updated_at = ?
WHERE username = ?