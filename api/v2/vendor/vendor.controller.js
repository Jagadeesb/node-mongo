const vendorService = require('./vendor.service');
const async = require('async');

const addNewVendor = function(newVendor, product, done) {
  vendorService.addNewVendor(newVendor,product, done);
}

const submitReview = function(vendorCode, product, reviewObj, done) {
	vendorService.submitNewReview(vendorCode, product, reviewObj, done);
}

const findVendorByCode = function(product, done) {
  vendorService.findVendorByCode(product, done);
}

module.exports = {
  addNewVendor,
  findVendorByCode,
  submitReview
}