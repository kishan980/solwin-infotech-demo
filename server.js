const app = require("./app");
const dotenv = require("dotenv");
const databaseConnection = require("./config/database");

// handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1);
})

//config
dotenv.config({ path: "../backend/config/config.env" });

//database connection
databaseConnection();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working http://localhost:${process.env.PORT}`);
});

// console.log(kishan)
//unhandled promisde rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandle Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
