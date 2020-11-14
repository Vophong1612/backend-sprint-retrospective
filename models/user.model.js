const db = require("../utils/db");

module.exports = {
    single: async (username) => {
        const rows = await db.load(`select * from user where username = ?`, username)
        if (rows.length === 0)
            return null;

        return rows[0];
    },
    add: (entity) => db.insert("user", entity),
    updatePassword: (pass,username) => db.load(`update user set password = '${pass}' where username = '${username}'`),
}