export class Queries {
    getQuery(table, columns, joinTables = [], params = {}, conditions = {}) {
        const DB = process.env.DB_NAME;
        let query = `SELECT ${columns} FROM ${DB}.${table}`;
        const values = [];

        if (joinTables.length > 0) {
            joinTables.forEach((join) => {
                query += ` JOIN ${DB}.${join.table} ON ${join.condition}`;
            });
        }

        const conditionsArray = [];
        if (Object.keys(params).length > 0) {
            for (const param in params) {
                if (param !== 'sort' && param !== 'range' && param !== 'start' && param !== 'conditions') {
                    conditionsArray.push(`${table}.${param} = ?`);
                    values.push(params[param]);
                }
            }
        }

        if (Object.keys(conditions).length > 0) {
            for (const param in conditions) {
                const condition = conditions[param];
                if (condition.table && condition.column && condition.value !== undefined) {
                    conditionsArray.push(`${condition.table}.${condition.column} = ?`);
                    values.push(condition.value);
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
}