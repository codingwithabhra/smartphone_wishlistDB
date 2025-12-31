const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    productId : String ,
    variant: {
      color: {
        type: String,
        required: true,
      },
      ram: {
        type: String,
        required: true,
      },
      storage: {
        type: String,
        required: true,
      },
    },
},
{
    timestamps: true,
});

const wishlistData = mongoose.model("wishlistData", wishlistSchema);

module.exports = wishlistData;