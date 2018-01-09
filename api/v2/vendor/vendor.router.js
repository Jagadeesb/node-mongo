const router = require('express').Router();
const vendorCtrl = require('./vendor.controller');

/**
 * Effective URL is POST /vendor/
 *
 * This API adds a new product to the catalog
 */
router.post('/', function(req, res) {
  try {
    let newVendor = req.body;
    vendorCtrl.addNewVendor(newVendor, product, function(err, result) {
      if (err) {
        console.error('Error in adding new product, ERROR::', err);
        // res.status(400).send(err);
        res.status(400).send({ error: 'Something went wrong, please check and tray again..!' });
        return;
      }
      res.status(201).send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in adding new product, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

/**
 * Effective URL is GET /products/
 *
 * This API finds product(s) in the catalog
 */
router.get('/', function(req, res) {
  try {
    vendorCtrl.findVendorByCode(function(err, result) {
      if (err) {
        console.error('Error in GET of vendor, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try with correct product code..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in GET of vendor, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

router.post('/:vendorCode/reviews', function(req, res) {
  try {
    let reviewObj = req.body;
    vendorCtrl.submitReview(req.params.vendorCode, product, reviewObj, function(err, result) {
      if (err) {
        console.error('Error in submitting review of vendor, ERROR::', err);
        res.status(400).send({error: 'Something went wrong, please try with correct product code..!'});
        return;
      }
      res.send(result);
      return;
    })
  } catch (err) {
    console.error('Unexpected error in submitting review of vendor, ERROR::', err);
    res.status(500).send({ error: 'Unexpected internal error, please try later..!' });
    return;
  }
});

module.exports = router;