import "dotenv/config";
import app from "./app.js";
import { createDebugger } from "./lib/debug.js";

const port = process.env.PORT || 3000;

const debug = createDebugger("server");

app.listen(port, () => {
  debug("Server listening on port: %s", port);
});
