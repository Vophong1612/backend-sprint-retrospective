const boardModel = require("../models/board.model");
const router = require("express").Router();

router.get("/my-board", async (req, res) => {
  const username = req.session.username;
  console.log(req.session);
  const list = await boardModel.loadAllByUser(username);
  res.json({
    code: 0,
    result: {
      boards: list,
    },
  });
});

router.post("/my-board", async (req, res) => {
  const username = req.session.username;
  boardModel
    .addByUser(username, req.body.new_board)
    .then((response) => {
      console.log(response);
      res.json({
        code: 0,
        result: {
          id: response.insertId,
          message: "ok",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        code: 1,
        result: {
          message: err,
        },
      });
    });
});

router.get("/board-total", async (req, res) => {
  const total = await boardModel.total();
  res.json({
    code: 0,
    result: total[0],
  });
});

router.post("/delete-board", async (req, res) => {
  const username = req.session.username;
  const owner = await boardModel.getOwner(req.query.board_id);
  if (owner.owner === username || owner.status === "public") {
    const total = await boardModel
      .delete(req.body.boardID)
      .then((response) => {
        res.json({
          code: 0,
          result: {
            message: "Delete board success",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          code: 1,
          result: {
            message: err,
          },
        });
      });
  } else {
    res.json({
      code: 2,
      result: {
        message: "You are not permission",
      },
    });
  }
});

router.post("/edit-board", async (req, res) => {
  const username = req.session.username;
  const owner = await boardModel.getOwner(req.query.board_id);
  if (owner.owner === username || owner.status === "public") {
    const edit_board = req.body.edit_board;
    const id = edit_board.boardID;
    const total = await boardModel
      .edit(req.body.edit_board)
      .then(async (response) => {
        const updated_board = await boardModel.singleById(id);
        res.json({
          code: 0,
          result: {
            updated_board: updated_board,
            message: "Edit board success",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          code: 1,
          result: {
            message: err,
          },
        });
      });
  } else {
    res.json({
      code: 2,
      result: {
        message: "You are not permission",
      },
    });
  }
});

module.exports = router;
