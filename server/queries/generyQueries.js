export class GenericQuery {
    static getQuery(table, columns, conditions = []) {
        let query = `SELECT ${columns} FROM ${table}`;
        const values = [];
        const conditionsArray = [];

        for (const param in conditions) {
            conditionsArray.push(`${param} ${conditions[param].operator} ?`);
            values.push(conditions[param].value);
        }

        if (conditionsArray.length > 0) {
            query += ` WHERE ${conditionsArray.join(' AND ')}`;
        }

        return { query, values };
    }

    static getAdvancedQuery(options = {}) {
        let addQuery = '';

        if (options.groupBy) {
            addQuery += ` GROUP BY ${options.groupBy}`;
        }

        if (options.having) {
            addQuery += ` HAVING ${options.having}`;
        }

        if (options.sort) {
            addQuery += ` ORDER BY ${options.sort}`;
        }

        if (options.limit && options.offset !== undefined) {
            addQuery += ` LIMIT ${options.limit} OFFSET ${options.offset}`;
        }

        return addQuery;
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
