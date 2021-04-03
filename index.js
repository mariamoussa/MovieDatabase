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
        res.send({ status: 500, error: true, message: "you have to provide a search" });
    } else {
        res.send({ status: 200, message: "ok", data: req.query["s"] });
    }
});

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get("/movies/add", (req, res) => {
    res.send({ status: 200, message: "ok" });
});

app.get("/movies/get", (req, res) => {
    res.send({ status: 200, data: movies });
});

app.get("/movies/edit", (req, res) => {
    res.send({ status: 200, message: "ok" });
});

app.get("/movies/delete", (req, res) => {
    res.send({ status: 200, message: "ok" });
});

app.get("/movies/read/id/:id", (req, res) => {
    let id = req.params.id;
    if (Object.values(movies)[id - 1] != null) {
        res.send({ status: 200, data: Object.values(movies)[id - 1] });
    } else {
        res.send({
            status: 404,
            error: true,
            message: "the movie " + id + " does not exist"
        });
    }
});

app.get("/movies/get/:input", (req, res) => {
    if (req.params.input === "by-date") {
        res.send({ status: 200, data: sortobject(movies, "year") });
    }
    if (req.params.input === "by-rating") {
        res.send({ status: 200, data: sortobject(movies, "rating") });
    }
    if (req.params.input === "by-title") {
        res.send({ status: 200, data: sortobject(movies, "title") });
    }
});