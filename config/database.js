const mongoose = require("mongoose");
const databaseConnection = () => {
  mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
  // .catch((err)=>{
  //     console.log(err)
  // })
};

module.exports = databaseConnection;
