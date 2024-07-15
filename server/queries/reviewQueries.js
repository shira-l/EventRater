export const getReviewByBusinessQuery = `
    SELECT 
        idReview, 
        rating, 
        description, 
        productionDate, 
        userName 
    FROM 
        reviews
        JOIN users ON idUser = userId 
    WHERE 
        reviews.isActive = 1 
        AND businessId = ?
        
`;