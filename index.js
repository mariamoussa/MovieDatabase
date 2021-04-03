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
            message: "The Movie " + id + " does not exist"
        });
    }
});

app.get("/movies/read", (req, res) => res.send({
    status: 200,
    data: movies
}));

app.get("/movies/read/by-date", (req, res) =>
    res.send({
        data: movies.sort((f, s) => {
            return f.year - s.year;
        }),
    })
);

app.get("/movies/read/by-rating", (req, res) =>
    res.send({
        data: movies.sort((f, s) => {
            return s.rating - f.rating;
        }),
    })
);

app.get("/movies/read/by-title", (req, res) =>
    res.send({
        data: movies.sort((f, s) => {
            return f.title.localeCompare(s.title);
        }),
    })
);

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

app.get("/movies/add", (req, res) => {
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    if (
        title == null ||
        year == null ||
        year.toString().length < 4 ||
        isNaN(year)
    ) {
        res.send({
            status: 403,
            error: true,
            message: "You cannot create a movie without providing a title and a year",
        });
    } else if (rating == null) {
        movies.push({ title: title, year: year, rating: 4 });
        res.send({ status: 200, data: movies });
    } else {
        movies.push({ title: title, year: year, rating: rating });
        res.send({ status: 200, data: movies });
    }
});

const sortobject = (object, value) => {
    object.sort((a, b) => a[value] - b[value]);
    return object;
};

app.delete("/movies/delete/:id", (req, res) => {
    let filmId = req.params.id;
    if (filmId >= movies.length || filmId < 0) {
        res.send({
            status: 404,
            error: true,
            message: `the movie id ${filmId} does not exist `,
        });
    } else {
        let films = movies;
        films.splice(filmId, 1);
        res.send(films);
    }
});

app.put("/movies/update/:id", (req, res) => {
    var movieID = req.params.id;
    var movieTitle = req.query.title;
    var movieYear = req.query.year;
    var movieRating = req.query.rating;
    if (movieID < 0 || movieID >= movies.length) {
        res.send("Invalid Movie id");
    }
    if (movieTitle != null) {
        movies[movieID].title = movieTitle;
    }
    if (movieYear != null) {
        movies[movieID].year = movieYear;
    }
    if (movieRating != null) {
        movies[movieID].rating = movieRating;
    }
    res.send(movies);
});