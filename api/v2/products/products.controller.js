const productService = require('./products.service');
const vendorCtrl = require('./vendor/vendor.controller');
const async = require('async');

const addNewProduct = function(newProduct, done) {
  productService.addNewProduct(newProduct, done);
}

const submitReview = function(productCode, reviewObj, done) {
	productService.submitNewReview(productCode, reviewObj, done);
}

const getProducts = function(done) {
  productService.getProducts(done);
}

const findProductByCode = function(productCode, done) {
	async.waterfall([
		productService.findProductByCode.bind(null, productCode),
		vendorCtrl.findVendorByCode.bind(product, productCode)
	], (err, result) => {
		productService.getProducts(done);
    vendorCtrl.findVendorByCode(done);
  });
}

module.exports = {
  addNewProduct,
  getProducts,
  submitReview,
  findProductByCode
}