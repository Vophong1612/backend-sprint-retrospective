const taskModel = require("../models/task.model");
const boardModel = require("../models/board.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
    const rows = await taskModel.taskByBoard(req.query.board_id);
    res.json({
        code: 0,
        result: rows,
    });
});

router.get("/task-total", async (req, res) => {
    const total = await taskModel.total();
    // console.log(rows[0]);
    res.json({
        code: 0,
        result: total[0],
    });
})

router.post("/new-task", async (req, res) => {
    taskModel.add(req.body.new_task)
        .then(response => {
            console.log(response);
            res.json({
                code: 0,
                result: {
                    id: response.insertId,
                    message: "Add task success"
                }
            })
        }).catch(err => {
            console.log(err);
            res.json({
                code: 1,
                result: {
                    message: err
                }
            })
        });
})

router.post("/update-column-task", async (req, res) => {
    const username = req.session.username;
    // console.log(req.query.board_id);
    const owner = await boardModel.getOwner(req.query.board_id);
    if (owner.owner === username) {
        taskModel.update_columnname(req.body.update_task)
            .then(response => {
                // console.log(response);
                res.json({
                    code: 0,
                    result: {
                        message: "Update task success"
                    }
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    code: 1,
                    result: {
                        message: err
                    }
                })
            });
    } else {
        res.json({
            code: 2,
            result: {
                message: "You are not permission"
            }
        })

    }
});

router.post("/update-content-task", async (req, res) => {
    const username = req.session.username;
    // console.log(req.query.board_id);
    const owner = await boardModel.getOwner(req.query.board_id);
    if (owner.owner === username) {
        // console.log(req.body.update_task);
        taskModel.update_content(req.body.update_task)
            .then(response => {
                // console.log(response);
                res.json({
                    code: 0,
                    result: {
                        update_task: req.body.update_task,
                        message: "Update task success"
                    }
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    code: 1,
                    result: {
                        message: err
                    }
                })
            });
    } else {
        res.json({
            code: 2,
            result: {
                message: "You are not permission"
            }
        })

    }
});

router.post("/delete-task", async (req, res) => {
    const username = req.session.username;
    const owner = await boardModel.getOwner(req.query.board_id);
    if (owner.owner === username) {
        console.log(req.body.tagID);
        taskModel.detele(req.body.tagID)
            .then(response => {
                res.json({
                    code: 0,
                    result: {
                        message: "Delete task success"
                    }
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    code: 1,
                    result: {
                        message: err
                    }
                })
            });
    } else {
        res.json({
            code: 2,
            result: {
                message: "You are not permission"
            }
        })

    }
});

module.exports = router;