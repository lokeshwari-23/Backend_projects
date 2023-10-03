const mongoose = require('mongoose');
require("dotenv").config()
const schema=mongoose.Schema({
        user_id:Number,
        username:String
})

const schema1=mongoose.Schema({
        comment_id:Number,
        body:String,
        post_id:Number,
        users:{
            user_id:Number,
            username:String
        }
})

const usersCollection=mongoose.model(process.env.COLL_NAME1,schema)
const commentsCollection=mongoose.model(process.env.COLL_NAME2,schema1)

module.exports={usersCollection,commentsCollection}