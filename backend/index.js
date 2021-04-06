const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

// ROUTING
//Test routes select *
// Req from frontend
app.post("/api/client", (req, res) => {
  pool.query(
    "SELECT id FROM urls WHERE url = $1",
    [req.body.url],
    (error, results) => {
      console.log(results);
      if (error) {
        console.log(error);
        res.status(404).json({ err: "url not found" });
      }

      if (!results.rows[0]) {
        console.log("Creating new entry in db...");
        pool.query(
          "INSERT INTO urls (url) VALUES ($1) RETURNING id",
          [req.body.url],
          (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.status(200).json({ surl: result.rows[0].id });
          }
        );
      } else {
        console.log("URL already existed in db");
        res.status(200).json({ surl: results.rows[0].id });
      }
    }
  );
});
// Req from client
app.get("/api/:id", (req, res) => {
  pool.query(
    "SELECT url FROM urls WHERE id = $1",
    [req.params.id],
    (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        res.status(404).json({ err: "url not found" });
      }
      if (result.rows[0].url.substring(0, 8) == "https://") {
        console.log(result.rows[0].url);
        res.redirect(result.rows[0].url);
      } else {
        console.log(result.rows[0].url.substring(0, 8));
        res.redirect("https://" + result.rows[0].url);
      }
    }
  );
});

//server
const port = process.env.PORT | 5000;
app.listen(port, () => {
  console.log("Server running on " + port);
});
