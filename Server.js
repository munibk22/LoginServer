require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const expressLayouts = require("express-ejs-layouts");

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs")

//Routes
app.use(express.json());
app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"));
app.use("/users", require("./routes/users"))

const posts = [
    {
        username: "Munib",
        title: "Post 1"
    },
    {
        username: "Kyle",
        title: "Post 2"
    },
];


const users = [];


app.get("/posts", (req, res) => {
    res.json(posts);

})

app.get("/users", (req, res) => {
    res.json(users)
})

app.post("/users", async (req, res) => {

    try {
        const name = req.body.name;
        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        const hashedPw = await bcrypt.hash(password, salt);
        console.log(salt);
        console.log(hashedPw);
        const user = ({ name: name, password: hashedPw });
        users.push(user);

        res.status(201).send();
    }
    catch { res.status(500).send() }

})

app.post("/users/login", async (req, res) => {
    const user = users.find((user) => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Logged In")
        }
        else {
            res.send("Not allowed")
        }
    }
    catch { res.status(500).send() }
})

app.get("/login", (req, res) => {

})










const port = (process.env.PORT || 3002);

app.listen(port, () => {
    console.log(`Port running on port: http://localhost:${port}`);
});
