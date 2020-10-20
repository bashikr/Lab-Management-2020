const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../src/User");
const userRole = require("../src/userRole.js");

users.use(cors());
process.env.SECRET_KEY = "secret";
users.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today,
        address: req.body.address,
        postnumber: req.body.postnumber,
        city: req.body.city,
        country: req.body.country,
        phonenumber: req.body.phonenumber,
        birthday: req.body.birthday,
        role: req.body.role
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered'})
                })
                .catch(err => {
                    res.send("error: " + err)
                })
            })
        } else {
            res.json({error: "User already exists"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

users.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.status(400).json({error: "User does not exist"})
            }
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
})


users.post("/changeRole", async (req, res) => {
    await userRole.changeUserPrivileges(
        req.body.email,
        req.body.role
    );
});

users.get("/showUsers", async (req, res) => {
    try {
        const pod1 = await userRole.showUsers();

        res.status(201).send(pod1);
    } catch (e) {
        res.status(400).send({ error: e });
    }
});

users.get("/showCurrentUser/:email", async (req, res) => {
    if(req.params.email) {
        const pod1 = await userRole.showCurrentUser(req.params.email);

        res.status(201).send(pod1);
    } else
    {
        res.send("I am Foo " + req.params.email);
    }
});

users.get("/deleteUser/:userId", async (req, res) => {
    if(req.params.userId) {
        const pod1 = await userRole.deleteUser(req.params.userId);

        res.status(201).send(pod1);
    } else
    {
        res.send("I am Foo " + req.params.userId);
    }
});

module.exports = users;
