const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/", (req, res) => {
    res.send("ok");
})

app.get("/test", (req, res) => {
    res.send({ status: 200, message: "ok" });
})

app.get("/time", (req, res) => {
    let time = new Date(Date.now());
    res.send({ status: 200, message: time.getHours() + ":" + time.getMinutes() });
});

app.get("/hello/:id", (req, res) => {
    res.send("hello " + req.params.id);
});

app.get("/search", (req, res) => {
    if (!req.query["s"]) {
        res.send({
            status: 500,
            error: true,
            message: "you have to provide a search",
        });
    } else {
        res.send({ status: 200, message: "ok", data: req.query["s"] });
    }
});