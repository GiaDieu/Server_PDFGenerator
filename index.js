const express = require("express");
const pdf = require("html-pdf");
const cors = require("cors");
const bodyParser = require("body-parser");

const PDFTemplate = require("./document");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//POST - PDF generator and fetching Data
app.post("/create-pdf", (req, res) => {
  pdf.create(PDFTemplate(req.body), {}).toFile("output.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});
//GET - Send the generated PDF to Client
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/output.pdf`);
});
app.listen(port, () => console.log(`Listening on PORT ${port}`));
