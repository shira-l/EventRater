export class Queries {

    getQuery(table, columns, joinTables = [], params = {}, groupBy = '') {
        let query = `SELECT ${columns} FROM ${table}`;
        const values = [];

        if (joinTables.length > 0) {
            joinTables.forEach((join) => {
                query += ` JOIN ${join.table} ON ${join.condition}`;
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

        if (groupBy) {
            query += ` GROUP BY ${groupBy}`;
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

    postQuery(table, data){
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        return { query, values };
    }
    deleteQuery(table,idObject) {
        const key=Object.keys(idObject)
        const values=Object.values(idObject)
        const query = `UPDATE ${table} SET isActive =0 WHERE ${key} = ? AND isActive =1 `;
        return {query,values};
    }
    updateQuery(table,columns,data) {
        const keys= Object.keys(columns).map((column) => `${column}=?`).join(', ');
        const placeholders = Object.keys(data).map((key) => `${key}=?`).join(' AND ');
        const values = [...Object.values(columns),...Object.values(data)];
        const query = `UPDATE ${table} SET ${keys} WHERE ${placeholders}`;
        return { query, values };
    }
}