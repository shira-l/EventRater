export class BusinessService {
    async getAllBusinessesByType(tableName, id, limit,entity, columns) {
        const query = getQuery(tableName, limit,entity, columns);
        const result = await executeQuery(query, [id]);
        return result;
    }
    
}