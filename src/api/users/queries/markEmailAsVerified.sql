UPDATE users
    SET is_email_verified = ?,
        updated_at = ?
WHERE username = ?