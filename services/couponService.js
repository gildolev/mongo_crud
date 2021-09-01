const { ok } = require('assert');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment'); 


class Coupon {
    constructor() {
        this.code = uuidv4().slice(0, 6);
        this.date = moment(new Date()).format("DD/MM/YYYY");
        this.isRedeem = false
    }
}

//test
//const p = new Coupon();
//console.log(p, 1)

function setCoupons(coupons) {
    fs.writeFileSync("./db/coupons.json", JSON.stringify(coupons));
}

function getCoupons() {
    return require('../db/coupons.json');
}
//GET /coupon/search/:code
function isCoupnExist(code) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    if (!foundCoupon) {
        return false;
    }else{
        return true;
    }
}
//POST /coupon/:code/redeem
function isCouponRedeemed(code) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    if (foundCoupon.isRedeem) {
        return true;
    }else{
        return false;
    }

}


//POST /coupon
function createCoupon() {
    let created = false;
    const coupons = getCoupons();
    while (!created) {
        const newCoupon = new Coupon();
        if (!isCoupnExist(newCoupon.code)) {
            coupons.push(newCoupon);
            setCoupons(coupons);
            created = true;
        }
        return created;
    }
}
//GET /coupon/:code
function getCoupon(code) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    return foundCoupon;
}
//DELETE /coupon/:code
function deleteCoupon(code) {
    const coupons = getCoupons();
    const filteredCoupons = coupons.filter(existingCoupon => existingCoupon.code !== code);
    setCoupons(filteredCoupons);
}

function editCoupon(code, data) {
    const coupons = getCoupons();
    const foundCoupon = coupons.find(existingCoupon => existingCoupon.code === code);
    if (!foundCoupon) {
        return false;
    }
    Object.keys(foundCoupon).forEach(key => {
        if (data[key]) {
            foundCoupon[key] = data[key];
        }
    });
    setCoupons(coupons);
    return foundCoupon;
}
//GET /coupon
function getAll() {
    return getCoupons();
}

module.exports = {
    editCoupon,
    getAll,
    getCoupon,
    deleteCoupon,
    createCoupon,
    isCoupnExist,
    isCouponRedeemed
}