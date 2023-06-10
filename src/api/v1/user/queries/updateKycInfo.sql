UPDATE users
    SET identification_number = ?,
        identification_document = ?,
        identification_document_issuer = ?
        front_image_of_document = ?,
        back_image_of_document = ?,
        selfie = ?,
        updated_at = ?
WHERE username = ?
