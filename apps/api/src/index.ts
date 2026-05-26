import { env } from "./config/env.js";
import { app } from "@/app.js";
import { logger } from "./logger/index.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});