const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const middleware = require('../middleware');
const bodyParser = require('body-parser');
router.use(bodyParser.json({
    strict: false
}))

//register from https://www.section.io/engineering-education/node-authentication-api/

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser = User({ username: req.body.username, email: req.body.email, password: hash })
            newUser.save()
                .then(user => {
                    res.status(200).json({ token: generateToken(user) })
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })
});

router.get('/jwt-test', middleware.verify, (req, res) => {
    res.status(200).json(req.user)
})

function generateToken(user) {
    return jwt.sign({ data: user }, process.env.JWT_SEC, { expiresIn: '24h' })
}

//login from https://www.section.io/engineering-education/node-authentication-api/
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
router.post("/login", async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(400).json("User not found with this email!");
            else {
                try {
                    bcrypt.compare(req.body.password, user.password, (error, match) => {
                        if (error) return res.status(500).json(error);
                        else if (match) res.status(200).json(user)
                        else res.status(404).json("Password is incorrect!");
                    })
                } catch (error) {
                    res.status(500).json(error);
                    console.log(err);
                }
            }
        })
})


//update user
router.put("/update/:id", function(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id }, { email: req.body.email, password: req.body.password }, function(err, docs) {
        if (err) res.json(err);
        else {
            res.status(200).json(docs);
        }
    });
});

//delete user
router.delete("/delete/:id", function(req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, function(err, docs) {
        if (err) res.json(err);
        else {
            // res.status(200).json(docs);
            res.send("User deleted successfully!");
        }
    });
});

//logout
router.post('/users/logout', Auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

//home page
router.get('/', function(res, req) {
    res.sendFile(__dirname + '/index.html');

    function css(response) {
        var cssFile = fs.readFileSync("/styles.css", { encoding: "utf8" });
        response.write(cssFile);
    }
})

module.exports = router;