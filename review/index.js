const express = require("express");

const db = require("./connection/db");

db.connect(function (err, _, done) {
  if (err) throw err;
  console.log(" Database Connection Success");

  done();
});

const app = express();
const PORT = 5008;

//boolean= tru or false//
const isLogin = true;

let blogs = [];

app.set("view engine", "hbs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  db.connect(function (err, client, done) {
    const query = "SELECT * FROM project";

    client.query(query, function (err, result) {
      if (err) throw err;

      let data = result.rows;

      let dataProject = data.map(function (data) {
        return data;
      });
      res.render("index", { blogs: dataProject });
    });
  });
});

app.get("/add-my-project", function (req, res) {
  db.connect(function (err, client, done) {
    const query = "SELECT * FROM project;";

    client.query(query, function (err, result) {
      if (err) throw err;

      console.log(result);
    });
  });
  res.render("add-my-project", { isLogin });
});

app.post("/blog-add", function (req, res) {
  let data = req.body;
  data.post_at = new Date();
  data.author = "Bachrudin Imam Siregar";

  blogs.push(data);

  res.redirect("/");
});

app.get("/blog-detail/:index", function (req, res) {
  let index = req.params.index;
  let blog = blogs[index];
  res.render("blog-detail", { blog });
});

app.get("/contact-me", function (req, res) {
  res.render("contact-me");
});

app.get("/blog-delete/:index", function (req, res) {
  let index = req.params.index;

  blogs.splice(index, 1);

  res.redirect("/");
});

app.listen(PORT, function () {
  console.log(`server start on PORT: ${PORT}`);
});

function getFullTime(time) {
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hour = time.getHours();
  let minute = time.getMinutes();

  let fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;

  return fullTime;
}

function getDistanceTime(time) {
  let timeNow = new Date();
  let timeBlog = new Date(time);

  let distance = timeNow - timeBlog; // miliseconds

  let dayDistance = Math.floor(distance / (24 * 60 * 60 * 1000));

  if (dayDistance != 0) {
    return dayDistance + " day ago";
  } else {
    let hourDistance = Math.floor(distance / (60 * 60 * 1000));

    if (hourDistance != 0) {
      return hourDistance + " hours ago";
    } else {
      let minuteDistance = Math.floor(distance / (60 * 1000));

      if (minuteDistance != 0) {
        return minuteDistance + " minutes ago";
      } else {
        let secondsDistance = Math.floor(distance / 1000);

        return secondsDistance + " second ago";
      }
    }
  }
}
/*
function getStartDate(start_date) {
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = start_date.getDate();
  let monthIndex = start_date.getMonth();
  let year = start_date.getFullYear();

  let hour = start_date.getHours();
  let minute = start_date.getMinutes();

  let fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;

  return fullTime;
}*/
/*
function getEndDate(date) {
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = date.getDate();
  let monthIndex = end_date.getMonth();
  let year = end_date.getFullYear();

  let hour = end_date.getHours();
  let minute = end_date.getMinutes();

  let fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;

  return fullTime;
} */
