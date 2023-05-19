const router = require("express").Router();
const mongoose = require('mongoose');
const Devices = require('../mongo/schemas/Devices');
// const { v4: uuidv4 } = require("uuid");

router.post('/', async (req, res) => {
    try {
        const device = await Devices.create({});
        console.log('BACKEND POST device: ', device)
        res.json({
            success: true,
            data: {
                device
            }
        })
    } catch (err){
        console.log(err);
        res.json({
            success: false,
            error: err
        })
    }
});

module.exports = router;
