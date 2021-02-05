const express = require('express')
require('./db/mongoose')

const Person = require("./models/person")

const app = express()
app.use(express.json())

// Create record person using the person model and save it to the database
let person = new Person({
    name: "firstName lastName",
    age: 19,
    favoriteFoods: ["Banana", "Cheese", "burrito"]
});
person
    .save()
    .then((doc) => {
        console.log("person is: ")
        console.log(doc)
    })
    .catch((err) => console.error(err))
 
//Create many records with model.create()
//array of people

let arrayOfPeople=[
  {
     name: "Ali",
     age: 15,
    favoriteFoods:["Oranges", "Chicken","burrito"]
 },
 {
    name: "Ania",
    age: 6,
    favoriteFoods:["fish","Soupe"]
 }
]

//Add the array to the database using person.create
Person.create(arrayOfPeople, (err,data) => {
 if (err) {
  Person(err);
  }
    Person(data);
  })

//Use Person.find() to search on database, all person
 let  x = "Ali"
 Person
.find({name: x})
.then((doc) =>{
console.log("finding persons: ")
console.log(doc);
})
.catch((err) => console.error(err));

// Use model.findOne() to Return a Single Matching Document from  Database using the food argument
Person
.findOne({ favoriteFoods: ["fish","Soupe"] })
.then((doc) => {
    console.log("In findOne: ")
    console.log(doc)
})
.catch((err) => console.error(err))
// Use model.findById() to Search Your Database By _id
Person
.findById({ _id: '601d22885174980fb551a1db' })
.then((doc) => {
    console.log("In findById: ")
    console.log(doc)
})
.catch((err) => console.error(err))
//Perform Classic Updates by Running Find, Edit, then Save
Person
.findById({ _id:'601d22885174980fb551a1db' })
.then((doc) => {
    doc.favoriteFoods.push("hamburger")
    doc.save();
    console.log(doc);
})
.catch((err) => console.error(err));
 
// Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({age: 15}, {$set:{name:"Not"}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!")
    }
    console.log("In findOne and update")
    console.log(doc)
})

// Delete one person by the person's name
// Person.remove({ name: 'try' }, { new: true },(err, doc) => {
//     if (err) {
//         console.log("Something wrong when removing data!")
//     }
//     console.log("In remove")
//     console.log(doc)
// })

// // Delete One Document Using model.findByIdAndRemove
// Person
//     .findByIdAndRemove({ _id: '601d230d57669c0fca67d30c' })
//     .then((doc) => {
//         console.log(doc);
//     })
//     .catch((err) => console.error(err));
// MongoDB and Mongoose -  Delete Many Documents with model.remove() with name Ania
// Person
// .remove({ name: 'Ania' })
//  .then((doc) => {
//    console.log(doc);
//   })
//  .catch((err) => console.error(err));

// Chain Search Query Helpers to Narrow Search Results
// Person
// .find()
// .sort({name: 1})
// .limit(1)
// .select("name age")
// .exec((err, doc) => {
//     if (err) {
//         console.log(" warning !")
//     }
//     console.log("le sort est:")
//     console.log(doc)
// })

// Person
// .find({favoriteFoods: {"$in": ["burrito"]}})
// .sort({name: 1})
// .limit(1)
// .select({name: 1, age: 1, favoritesFoods: 1})
// .exec((err, doc) => {
//     if (err) {
//         console.log(" warning !")
//     }
//     console.log("le sort est:")
//     console.log(doc)
// })
module.exports = app