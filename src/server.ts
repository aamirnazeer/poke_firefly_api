import { app } from "./app";
import { ENV, PORT } from "./core/env";

async function main() {
  if (!ENV) throw new Error("ENV not defined");
  if (!PORT) throw new Error("PORT not defined");
  app.listen(PORT);
}

main()
  .then(() => console.log(`${ENV} server stated on port ${PORT}`))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
