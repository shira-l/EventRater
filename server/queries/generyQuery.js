export class GenericQuery {
    static getQuery(table, columns, params = {}) {
        let query = `SELECT ${columns} FROM ${table}`;
        const values = [];
        const conditionsArray = [];

        for (const param in params) {
            if (param !== 'sort' && param !== 'range' && param !== 'start' && param !== 'conditions') {
                conditionsArray.push(`${param} ${params[param].operator} ?`);
                values.push(params[param].value);
            } else {
                conditionsArray.push(`${param} = ?`);
                values.push(params[param]);
            }
        }

        if (conditionsArray.length > 0) {
            query += ` WHERE ${conditionsArray.join(' AND ')}`;
        }

        if (options.groupBy) {
            query += ` GROUP BY ${options.groupBy}`;
        }

        if (options.sort) {
            query += ` ORDER BY ${options.sort}`;
        }

        if (options.limit && options.offset !== undefined) {
            query += ` LIMIT ${options.limit} OFFSET ${options.offset}`;
        }

        return { query, values };
    }

    static postQuery(table, data) {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        return { query, values };
    }

    static updateQuery(table, data, conditions) {
        const setClause = Object.keys(data).map((column) => `${column} = ?`).join(', ');
        const conditionClause = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
        const values = [...Object.values(data), ...Object.values(conditions)];
        const query = `UPDATE ${table} SET ${setClause} WHERE ${conditionClause}`;
        return { query, values };
    }

    static deleteQuery(table, conditions) {
        const conditionClause = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
        const values = Object.values(conditions);
        const query = `DELETE FROM ${table} WHERE ${conditionClause}`;
        return { query, values };
    }
}
