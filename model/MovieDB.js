const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Anshidha:Anshidha@cluster0.eh9k7sv.mongodb.net/?retryWrites=true&w=majority");

const Schema = mongoose.Schema;

var MovieScehema = new Schema ({
    m_name : String,
    m_actor : String,
    m_actress : String,
    m_director : String,
    m_releasedyear : Number,
    m_camera : String,
    m_producer : String,
    m_language : String

});

var MovieInfo = mongoose.model("movies",MovieScehema)

module.exports = MovieInfo;


