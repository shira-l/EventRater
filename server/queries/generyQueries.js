export class GenericQuery {
    static getQuery(table, columns, conditions = []) {
        let query = `SELECT ${columns} FROM ${table}`;
        const conditionStrings = conditions
        .map(condition => `${condition} = ?`)
        .join(' AND ');

        if (conditionStrings) {
            query += ` WHERE ${conditionStrings}`;
        }
        return query;
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
        const columns = data.join(', ');
        const placeholders = data.map(() => '?').join(', ');
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        return query;
    }

    static updateQuery(table, data, conditions) {
        const setClause = data.map((column) => `${column} = ?`).join(', ');
        const conditionClause = conditions.map((key) => `${key} = ?`).join(' AND ');
        // const values = [...Object.values(data), ...Object.values(conditions)];
        const query = `UPDATE ${table} SET ${setClause} WHERE ${conditionClause}`;
        return query;
    }

    static deleteQuery(table, conditions) {
        const conditionClause = conditions.map((key) => `${key} = ?`).join(' AND ');
        const query = `DELETE FROM ${table} WHERE ${conditionClause}`;
        return query;
    }
}