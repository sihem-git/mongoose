const mongoose = require ("mongoose")
const validator = require("validator")
const personSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value<0) {
                throw new Error("age ne peut pas inferieur a 0")
            }
        }
    },
    favoriteFoods: {
        type: [String], // Array of string
    }
}, {
    timestamps: true
})
const Person = mongoose.model("Person", personSchema)
module.exports= Person