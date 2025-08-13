import { Router } from "express"
import Product from "../Models/Product.models.js";
import { Category } from "../Models/Category.models.js";

const router = Router();

router.get('/view-product/:id', async (req, res) => {
    const product_id = req.params.id;
    console.log(product_id);
    const productDetails = await Product.find({_id: product_id});
    res.send(productDetails);
})

router.get('/categories', async (req, res) => {
    const categories = await Category.find({}, { name: 1 });
    res.send(categories);
})

router.get('/by-category', async (req, res) => {
    const categoryId = req.query.id;
    console.log(categoryId);
    if (categoryId == undefined) {
        return res.send({
            status: 0,
            msg: "No Category ID found"
        })
    }
    if (categoryId != "") {
        const categories = await Category.find({ _id: categoryId });
        const filter_by_category = await Product.find({ _id: categories[0].product_ids }, { title: 1, price: 1, rating: 1, stock: 1, images: 1 })
        return res.send(filter_by_category)
    }
    if (categoryId == "") {
        const allProducts = await Product.find({}, { title: 1, price: 1, images: 1, rating: 1, stock: 1 });
        return res.send(allProducts);
    }
    
})

export default router;