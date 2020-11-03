const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { log } = require("util");
const { response } = require("express");
const router = require("express").Router();

router.get("/single-user", async (req, res) => {
    const username = req.session.username;
    const user = await userModel.single(username);
    res.json({
        code: 0,
        result: {
            user: user,
        },
    });
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    const user = await userModel.single(username);
    // console.log(user);
    // let code = -99;
    // let message = "";
    if (user == null) {
        console.log("Chua co tai khoan");
        return res.json({
            code: -1,
            result: {
                message: "Not a user"
            }
        })
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
            console.log("Sai pass");
            message = "Incorrect password";
            return res.json({
                code: -2,
                result: {
                    message: "Incorrect password!"
                }
            });
        }
        else {
            req.session.username = username;
            req.session.isAuth = true;
            console.log(req.session);
            res.json({
                code: 0,
                result: {
                    cur_user: user,
                    message: "welcome! " + username
                }
            })
        }
    })
})

router.post("/logout", async (req, res) => {
    req.session.username = null;
    req.session.isAuth = false;
    res.json({
        code: 0,
        result: {
            message: "Sign out success!"
        }
    })
});

router.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    const user = await userModel.single(username);
    // console.log(user);
    if (user !== null) {
        console.log("Đã tồn tại user");
        return res.json({
            code: -1,
            result: {
                message: "Duplicate username"
            }
        })
    }
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const entity_user = {
                username: username,
                password: hash,
            };
            await userModel.add(entity_user)
            .then(response => {
                res.json({
                    code: 0,
                    result: {
                        message: "Register success!",
                    }
                })
            });
            
        });
    });
})
// router.get("/board-total", async (req, res) => {
//     const total = await boardModel.total();
//     res.json({
//         code: 0,
//         result: total[0],
//     });
// });
module.exports = router;