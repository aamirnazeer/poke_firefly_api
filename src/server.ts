import { app } from "./app";
import { DB_FILE_NAME, ENV, PORT, POKE_API_URL } from "./core/env";

async function main() {
  if (!ENV) throw new Error("ENV not defined");
  if (!PORT) throw new Error("PORT not defined");
  if (!DB_FILE_NAME) throw new Error("DB_FILE_NAME not defined");
  if (!POKE_API_URL) throw new Error("POKE_API_URL not defined");

  app.listen(PORT);
}

main()
  .then(() => console.log(`${ENV} server stated on port ${PORT}`))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
