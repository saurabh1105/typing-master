var express = require("express");
var router = express.Router();
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("entername", { title: "speed styping" });
});
router.post("/", function (req, res, next) {
  const name = req.body.name;
  if (name.length < 6) return res.render("error", { title: "speed styping" });

  res.render("index", { title: "speed styping", player: name });
});
router.get("/game", function (req, res, next) {
  res.render("error", { title: "speed styping" });
});
router.get("/scores", function (req, res, next) {
  res.render("score", { title: "speed typing" });
});
module.exports = router;
