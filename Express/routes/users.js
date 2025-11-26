import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User list");
});

router.get("/new", (req, res) => {
  res.send("User New Form");
});

router.post("/", (req, res) => {
  res.send("Create user");
});

router.get("/:id", (req, res) => {
  req.params.id;
  res.send(`User get with id ${req.params.id}`);
});

router
  .route("/:id")
  .get((req, res) => {
    req.params.id;
    res.send(`User GET with id ${req.params.id}`);
  })
  .put((req, res) => {
    req.params.id;
    res.put(`UPDATE User with id ${req.params.id}`);
  })
  .delete((req, res) => {
    req.params.id;
    res.delete(`DELETE User with id ${req.params.id}`);
  });

export default router;
