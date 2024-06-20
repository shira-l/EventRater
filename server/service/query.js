export class Queries {
    getQuery(table, columns, joinTables = [], params = {}) {
        const DB = process.env.DB_NAME;
        let query = `SELECT ${columns} FROM ${DB}.${table}`;
        const values = [];

        if (joinTables.length > 0) {
            joinTables.forEach((join) => {
                query += ` JOIN ${DB}.${join.table} ON ${join.condition}`;
            });
        }  

        if (Object.keys(params).length > 0) {
            const conditions = [];
            for (const param in params) {
                if (param !== 'sort' && param !== 'range' && param !== 'start') {
                    // conditions.push(`${DB}.${param} = ?`);
                    conditions.push(`${param} = ?`);
                    values.push(params[param]);
                }
            }

            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`;
            }

            if (params.sort) {
                query += ` ORDER BY ${params.sort}`;
            }
            if (params.range && params.start) {
                const offset = params.start;
                const limit = params.range;
                query += ` LIMIT ${limit} OFFSET ${offset}`;
            }  
        }
        return { query, values };
    }
}