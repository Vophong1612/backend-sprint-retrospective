const db = require("../utils/db");

module.exports = {
    total: () => db.load(`Select count(*) as total from tag`),
    taskByBoard: (boardID) => db.load(`select * from tag where boardID = ?`, boardID),
    add: (entity) => db.insert("tag", entity),
    update_columnname: (entity) => {
        const condition = { tagID: entity.tagID };
        delete entity.tagID;
        return db.update("tag", entity, condition);
    },
    update_content: (entity) => {
        const condition = { tagID: entity.tagID };
        delete entity.tagID;
        return db.update("tag", entity, condition);
    },
    detele: (id) => db.load(`delete from tag where tagID = ?`, id)
}