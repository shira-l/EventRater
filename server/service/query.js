export class Queries {
    static DB = process.env.DB_NAME;

    getQuery(table, columns, joinTables = [], params = {}) {
        let query = `SELECT ${columns} FROM ${Queries.DB}.${table}`;
        const values = [];

        if (joinTables.length > 0) {
            joinTables.forEach((join) => {
                query += ` JOIN ${Queries.DB}.${join.table} ON ${join.condition}`;
            });
        }

        const conditionsArray = [];
        if (Object.keys(params).length > 0) {
            for (const param in params) {
                if (param !== 'sort' && param !== 'range' && param !== 'start' && param !== 'conditions') {
                    conditionsArray.push(`${param} = ?`);
                    values.push(params[param]);
                }
            }
        }

        if (conditionsArray.length > 0) {
            query += ` WHERE ${conditionsArray.join(' AND ')}`;
        }

        if (params.sort) {
            query += ` ORDER BY ${params.sort}`;
        }

        if (params.range && params.start) {
            const offset = params.start;
            const limit = params.range;
            query += ` LIMIT ${limit} OFFSET ${offset}`;
        }

        return { query, values };
    }

    postQuery(){
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        const query = `INSERT INTO ${Queries.DB}.${table} (${columns}) VALUES (${placeholders})`;
        return { query, values };
    }
}