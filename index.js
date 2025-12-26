const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOption));

const WishlistData = require("./models/wishlist.models");
const { initialisedatabase } = require("./db/db.connect");
initialisedatabase();

async function createwishlistdata(newData){
    try {
        const wishlistdata = await WishlistData(newData);
        const saveData = wishlistdata.save();
        return saveData;
    } catch (error) {
        throw error;
    }
};

app.get("/", (req, res) => {
    res.send("Hello from wishlist express server");
});

// to send data to DB -----------
app.post("/wishlist", async(req, res) => {
    try {
        const newWishListData = await createwishlistdata(req.body);
        res.status(200).json({message: "Data added seccessfully", newWishListData: newWishListData});
    } catch (error) {
        res.status(500).json({error: "Failed to add data to database"});
    }
});

// to get all the products from DB
async function getAllProducts(){
    try {
        const allProducts = await WishlistData.find();
        return allProducts;
    } catch (error) {
        throw error;
    }
}

app.get("/wishlist", async(req, res) => {
    try {
        const allPhones = await getAllProducts();
        if(allPhones.length != 0){
            res.json(allPhones);
        } else {
            res.status(404).json({error: "Data not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get data"});
    }
})

// to delete from DB
async function deleteProductIds(productId){
    try {
        const deleteProduct = await WishlistData.findByIdAndDelete(productId);
        return deleteProduct;
    } catch (error) {
        throw error;
    }
}

app.delete("/wishlist/:wishlistId", async(req, res)=> {
    try {
        const deleteData = await deleteProductIds(req.params.wishlistId);
        if(deleteData){
            res.status(200).json({message: "Data deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete product"})
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})