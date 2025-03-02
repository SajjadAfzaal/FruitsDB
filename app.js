const mongoose = require("mongoose");

// Connecting to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/fruitsDB")
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Defining Fruit Schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is necessary"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// Creating Fruit Documents
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 7,
  review: "Nice kiwis",
});
const orange = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Juicy orange",
});
const banana = new Fruit({
  name: "Banana",
  rating: 10,
  review: "Nice tasty bananas",
});

// Inserting multiple fruits into the database
// Fruit.insertMany([kiwi, banana, orange])
//   .then(() => {
//     console.log("Fruits inserted successfully!");
//     return Fruit.find(); // Fetch all fruits
//   })
//   .then((fruits) => {
//     console.log("All Fruits in DB:");
//     fruits.forEach((fruit) => console.log(fruit.name)); // Print fruit names
//     mongoose.connection.close(); // Close connection after fetching data
//   })
//   .catch((err) => console.error("Error:", err));

// rating validation check
const mango = new Fruit({
  name: "mango",
  rating: 9,
  review: "Wao mangoes",
});
//mango.save();

// name required validation check
const noName = new Fruit({
  rating: 9,
  review: "Wao mangoes",
});
//noName.save();

// Updation
// Fruit.updateOne({ name: "mango" }, { name: "Langra" })
//   .then(() => {
//     console.log("Name updated Successfully");
//   })
//   .catch((err) => console.error("Error:", err));

// Deletion
Fruit.deleteOne({ name: "Langra" })

  .then(() => {
    console.log("Deleted Successfully");
  })
  .catch((err) => console.error("Error:", err));

// Defining Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// Creating and Saving a Person
const person = new Person({
  name: "Ahmad",
  age: 22,
  favFruit: kiwi,
});

//person.save().then(() => console.log("Person added successfully!"));

//updating old persons fav fruit
Person.updateOne({ name: "Sajjad" }, { favFruit: banana })
  .then(() => {
    console.log("Sajjad's fav fruit added successfully");
  })
  .catch((err) => {
    console.log(err);
  });
