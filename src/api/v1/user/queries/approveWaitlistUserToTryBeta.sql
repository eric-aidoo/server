UPDATE waitlist_users
    SET is_approved_to_test = ?,
        updated_at = ?
WHERE email = ?