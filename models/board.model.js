const db = require("../utils/db");

module.exports = {
    singleById: async (id) => {
        const rows = await db.load(`select * from board where boardID = ?`, id);
        if (rows.length === 0)
            return null;

        return rows[0];
    },
    total: () => db.load(`Select count(*) as total from board`),
    loadAllByUser: (username) => db.load(`SELECT * FROM board WHERE owner = ?`, username),
    addByUser: (username, entity) => db.insert("board", entity),
    getOwner: async(id) => {
        const rows = await db.load(`SELECT owner FROM board WHERE boardID = ?`, id);
        if (rows.lenght === 0)
            return null;
        return rows[0];
    },
    edit: (entity) => {
        const condition = { boardID: entity.boardID };
        delete entity.boardID;
        return db.update("board", entity, condition);
    },
    delete: (id) => db.load(`delete from board where boardID = ? `, id),
}