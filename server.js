const express = require("express");
const cors = require("cors");
const path = require("path");
const Unblocker = require("unblocker");

class App {
  #port;

  constructor(port) {
    this.#port = port;

    this.init();
  }

  init() {
    this.app = express();

    // create server
    this.unblocker = new Unblocker({
      prefix: "/",
    });
    this.app.use(this.unblocker);
    this.app.use(cors());

    // serve js files and index.html to the server
    this.app.use(express.static(path.join(__dirname, "/public")));

    /* this.app.use(function (_, res) {
      res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
    }); */

    // show server
    this.app.listen(this.#port, () => {
      console.log(`Server listening on port ${this.#port}. \n`);
    });
  }
}

const app = new App(2000);
