const mongoose = require('mongoose');

const PROD_CODE = ['Valid', 'In-Valid'];

let schema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  product: { type: String, unique: true, required: true },
  status: { type: String, enum: PROD_CODE, default: 'Valid', required: true },
  rank: { type: Number, required: true }
}, { collection: 'vendor' });

// Virtual column, will not be persisted in dB
schema.virtual('getVendor')
  .get(function(product) {
    return (product && this.status === 'Valid');
  });

schema.statics = {
  // methods which operate at collection
  // Caution: cannot use arrow functions
  // Eg: findByVendor
}

schema.methods = {
  // method which operate on the instance or at document
  // Caution: cannot use arrow functions
  // Eg: getDiscountedPrice
}

// Composite Unique key
schema.index({
  code: 1,
  email: 1,
  product: 1,
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("vendor", schema);
