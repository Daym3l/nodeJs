const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const mongoConnect = cb => {
  mongoClient
    .connect("mongodb://localhost:27017/node_complete")
    .then(client => {
      console.log("conected");
      cb(client);
    })
    .catch(err => console.error(err));
};
module.exports = mongoConnect;