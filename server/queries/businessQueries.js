export const getBusinessByCategoryQuery = `
    SELECT 
        idBusiness, userName, locationName, 
        COUNT(idReview) AS reviewCount, 
        AVG(rating) AS averageRating, 
        MIN(itemPrice) AS minPrice, 
        MAX(itemPrice) AS maxPrice 
    FROM 
        businesses
        JOIN categories ON category = idCategory 
        JOIN locations ON location = idLocation 
        LEFT JOIN reviews ON idBusiness = reviews.businessId 
        JOIN users ON businesses.userId = idUser 
        LEFT JOIN prices ON idBusiness = prices.businessId 
    WHERE 
        users.isActive = 1 
        AND categoryName = ?
`;

export const getBusinessByIdQuery = `
    SELECT 
        about, email, phone 
    FROM 
        businesses b 
        JOIN users u ON b.userId = u.idUser 
    WHERE 
        b.idBusiness = ?
`;