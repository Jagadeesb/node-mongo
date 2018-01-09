const VendorModel = require('./vendor.entity');

const addNewVendor = function(newVendor, product, done) {
  let vendor = new VendorModel();
  vendor.name = newVendor.name;
  vendor.code = newVendor.code;
  vendor.product = newVendor.vendor;
  vendor.email = newVendor.email;
  vendor.status = newVendor.status;
  vendor.rank = newVendor.rank;

  vendor.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new vendor, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
}

const findVendorByCode = function(product, done) {
  let query = product;
  let fieldOptions = null;
  let page = 1;
  let limit = 10;

  VendorModel
    .find(query)
    .sort({ "addedOn": -1 })
    .select(fieldOptions)
    .skip((page > 0) ? limit * (page - 1) : 0)
    .limit(limit)
    .exec((err, colln) => {
      if (err) {
        console.error('Error in finding vendor, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, colln);
    });
}


const submitNewReview = function(vendorCode, product, reviewObj, done) {
  let query = { code: vendorCode, product: product };
  let modification = {
    $push: {
        rank: reviewObj.rank
      }
    }
  };
  let options = {
    new: true, //return the updated document
    upsert: false, //don't insert if not found
  };

  VendorModel.findOneAndUpdate(query, modification, options,
    function(err, updatedDoc) {
      if (err) {
        console.error("Error in submitting review, ERROR::", err);
        done(err)
        return;
      }
      return done(null, updatedDoc);
    }
  );

module.exports = {
  addNewVendor,
  findVendorByCode,
  submitNewReview
}