SELECT u.id,
       u.type,
       u.role, 
       u.status,
       u.is_email_verified,
       u.is_phone_verified,
       u.is_id_verified,
       u.first_name,
       u.middle_name,
       u.last_name,
       u.email, 
       u.username, 
       u.password, 
       u.country_of_residence,
       u.refresh_token,
       u.avatar, 
       u.phone_number, 
       u.date_of_birth, 
       u.authorization_pin,
       u.otp_code,
       u.otp_code_expiration,
       u.email_verification_code,
       u.email_verification_code_expiration,
       JSON_OBJECT(
          'line1', a.line1,
          'line2', a.line2,
          'city', a.city,
          'state', a.state,
          'zip_code', a.zip_code,
          'country', a.country
       ) AS address,
       JSON_OBJECT(
          'identification_document_type', u.identification_document_type,
          'front_image_of_document', u.front_image_of_document,
          'back_image_of_document', u.back_image_of_document,
          'selfie', u.selfie,
          'ssn', u.ssn
       ) AS kyc_document,
       u.consents,
       u.created_at, 
       u.updated_at
FROM users AS u 
LEFT JOIN users_billing_address AS a ON u.username = a.user
WHERE u.country_of_residence = ?;