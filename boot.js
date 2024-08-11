import router from "./routes.js"
import db from "./database_config.js"
import express from "express"

const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', router);


export default async () => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log('Connection has been established successfully.');

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    throw error
  }
}