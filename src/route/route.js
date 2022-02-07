import { Router } from "express";
import session from "express-session";
import { getProducts, postProduct } from "../controllers/product";
const router = Router();

const oneDay = 1000 * 60;

router.use(
  session({
    secret: "secret",
    cookie: { maxAge: oneDay },
    saveUninitialized: true,
    resave: true,
  })
);
const myUser = "clave";
const myPassword = 1234;

router.get("/login", (req, res) => {
  const pass = req.query;

  if (pass.myUser == myUser && pass.myPassword == myPassword) {
    req.session.loggedIn = true;
    req.session.contador = 1;
    req.session.admin = true;
    res.json({ msg: "bienvenido", oneDay });
  } else res.status(401).json({ msg: "no estas autorizado" });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ msg: "session destruida" });
});

const validateLogIn = (req, res, next) => {
  if (req.session.loggedIn) next();
  else res.status(401).json({ msg: "no estas autorizado" });
};

router.get("/", validateLogIn, getProducts);

export default router;
