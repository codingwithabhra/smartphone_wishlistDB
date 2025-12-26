const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    productId : String ,
},
{
    timestamps: true,
});

const wishlistData = mongoose.model("wishlistData", wishlistSchema);

module.exports = wishlistData;