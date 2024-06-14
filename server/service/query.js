export class Queries{
    getQuery(table, columns, params) {
    const DB_NAME = process.env.DB_NAME;
    let query = `SELECT ${columns} FROM ${DB_NAME}.${table}`;
    if (Object.keys(params).length > 0) {
        const conditions = [];
        Object.keys(params).forEach(param => {
            if (param !== 'sort' && param !== 'limit' && param !== 'page') {
                conditions.push(`${param} = ?`);
            }
        });

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        if (params.sort) {
            query += ` ORDER BY ${queryParams.sort}`;
        }
        if (params._start) {
            const offset = (queryParams.page - 1) * queryParams.limit;
            query += ` LIMIT ${queryParams.limit} OFFSET ${offset}`;
        }
    }
    return query;
}
}