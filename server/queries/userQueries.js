export const loginUserQuery = `
    SELECT 
        idUser, userName, password
    FROM 
        users 
    JOIN 
        passwords ON users.passwordId = idPassword 
    WHERE 
        email = ? 
        AND isBusiness = false
`;