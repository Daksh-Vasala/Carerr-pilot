import "dotenv/config";
import app from "./app.ts";
import { createDebugger } from "./lib/debug.ts";

const port = process.env.PORT || 3000;

const debug = createDebugger("server");

app.listen(port, () => {
  debug("Server listening on port: %s", port);
});
