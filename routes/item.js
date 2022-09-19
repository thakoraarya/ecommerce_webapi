const router = require("express").Router();
const Item = require("/models/Item");
const Auth = require('/routes/auth');

//create new item
router.post("/new", Auth, async(req, res) => {
    try {
        const newItem = new Item({
            ...req.body,
            owner: req.user._id
        })
        await newItem.save()
        res.status(201).send(newItem)
    } catch (error) {
        res.status(400).send({ message: "error" })
    }
});


//retrieve an item
router.get("/items/:id", async(req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id })
        if (!item) {
            res.status(404).status({ error: "product not found" })
        }
        res.status(200).send(item)
    } catch (err) {
        res.status(400).json(err)
    }
});

//retrieve all items
router.get("/items/:id", async(req, res) => {
    try {
        const items = await Item.find()
        res.status(200).send(items)
    } catch (err) {
        res.status(400).json(err)
    }
});

//modity a product item
router.put("/items/:id", async(req, res) => {
    const Updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'price', 'category']

    const isValidOperation = Updates.every((update) =>
        allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
        const item = await Item.findOne({ _id: req.params.id })
        if (!item) {
            return res.status(404).send()
        }
        Updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (err) {
        res.status(400).send(err)
    }
});

//remove product item
router.delete("", async(req, res) => {})


module.exports = router;