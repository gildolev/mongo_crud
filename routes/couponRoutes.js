const express = require('express');
const router = express.Router();
const couponService = require('../services/couponService');




router.get('/', getListOfCoupons);
router.get('/:code', getCoupon);
router.get('/search/:code', isCoupnExist);
router.put('/:code', editCoupon);
router.post('/:code/redeem', isCouponRedeemed );
router.post('/', createCoupon);
router.delete('/:code', deleteCoupon);




//GET /coupon
function getListOfCoupons(req,res){
    try {
        const coupons = couponService.getAll();
        res.send(coupons);
    }
    catch (e) {
        console.log(e, "Error at getListOfCoupons");
        return res.status(500).json({ message: "Error at getListOfCoupons" })
    }
}

//GET /coupon/:code
function getCoupon(req,res){
    try {
        const { code } = req.params;
        const coupon = couponService.getCoupon(code);
        if (!coupon) {
            res.status(404).send();
        } else {
            res.send(coupon);
        }
    }
    catch (e) {
        console.log(e, "Error at getCoupon");
        return res.status(500).json({ message: "Error at getCoupon" })
    }
}
//GET /coupon/search/:code
function isCoupnExist(req,res){
    try {
        const { code } = req.params;
        const success = couponService.isCoupnExist(code);
        if (success) {
            res.status(200).send('Coupon is exist');
        } else {
            res.status(404).send('Coupon does not found')
        } 
    }
    catch (e) {
        console.log(e, "Error at isCoupnExist");
        return res.status(500).json({ message: "Error at isCoupnExist" })
    }
}
//PUT /coupon/:code
function editCoupon(req,res){//PUT /coupon/:code
    try {
        const coupon = req.body;
        const { code } = req.params;
        const updatedcoupon = couponService.editCoupon(code, coupon);
        if (updatedcoupon) {
            res.send(updatedcoupon);
        } else {
            res.status(400).send();
        }
    }
    catch (e) {
        console.log(e, "Error at editCoupon");
        return res.status(500).json({ message: "Error at editCoupon" })
    }
}
//POST /coupon
function createCoupon(req,res){
    try {
        const success = couponService.createCoupon();
        if (success) {
            res.status(201).send('coupon added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    }
    catch (e) {
        console.log(e, "Error at createCoupon");
        return res.status(500).json({ message: "Error at createCoupon" })
    }
}
//POST /coupon/:code/redeem
function isCouponRedeemed(req,res){
    try {
        const { code } = req.params;
        const Redeemed = couponService.isCouponRedeemed(code);
        if (Redeemed) {
            res.status(400).send('Coupon is Redeemed');
        } else {
            res.status(400).send('Coupon is not Redeemed')
        }
    }
    catch (e) {
        console.log(e, "Error at isCouponRedeemed");
        return res.status(500).json({ message: "Error at isCouponRedeemed" })
    }
}
//DELETE /coupon/:code
function deleteCoupon(req,res){
    try {
        const { code } = req.params;
        couponService.deleteCoupon(code);
        res.status(200).send('Coupon deleted')
    }
    catch (e) {
        console.log(e, "Error at deleteCoupon");
        return res.status(500).json({ message: "Error at deleteCoupon" })
    }
}



module.exports = router;