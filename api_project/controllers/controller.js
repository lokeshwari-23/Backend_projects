const { default: axios } = require('axios');
const { usersCollection, commentsCollection } = require('../model/model')
const utils = require("../utils/utils.js")

exports.users =async (req, res) => {
    let response = await utils.sendRequest('comments')
    if (response?.error) {
        console.log("ERROR:", response)
        return;
    }
    for(var i=0;i<response.data.comments.length;i++) {
        let value= await usersCollection.find({user_id: response.data.comments[i].user.id})
        // console.log(value,"hi")
        if(value.length === 0) {
        usersCollection.create({user_id:response.data.comments[i].user.id,username:response.data.comments[i].user.username})
        }
    }
    res.redirect('/refresh/users')
    
}

exports.comments = async (req, res) => {
    let response = await utils.sendRequest('comments')
    if (response?.error) {
        console.log("ERROR:", response)
        return;
    }
    for(var i=0;i<response.data.comments.length;i++){
        let value= await commentsCollection.find({comment_id: response.data.comments[i].id})
        if(value.length===0){
        let object={
            comment_id: response.data.comments[i].id,
            body: response.data.comments[i].body,
            post_id: response.data.comments[i].postId,
            users:{
                user_id: response.data.comments[i].user.id,
                username: response.data.comments[i].user.username
            }
        } 
    commentsCollection.create(object)   
        }
    }
    res.redirect('/refresh/comments')
}

exports.refresh=async(req,res)=>{
    let par = req.params.db;
    const data=await utils.find_db(par)
    res.send(data)
}   