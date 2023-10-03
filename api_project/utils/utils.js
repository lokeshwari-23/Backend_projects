const API_URL = process.env.API_URL
const { default: axios } = require('axios');
const { usersCollection, commentsCollection } = require('../model/model')

const generateURL = (path) => {
    return `${API_URL}/${path}`
}

const sendRequest = async (path) => {
    try {
        return await axios.get(generateURL(path))
    } catch (err) {
        return { error: 1, message: err.message }
    }

}
const find_db= async (dbname) => {
    
    if(dbname=='users')
    {
        return await usersCollection.find({})
    }
    else{
        return await commentsCollection.find({})
    }
    
}
module.exports = {
    generateURL,
    sendRequest,
    find_db
}