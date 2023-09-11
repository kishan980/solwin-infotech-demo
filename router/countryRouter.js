const express = require("express");
const {
  stateAdd,
  countryAdd,
  getAllCountry,
  countryWiseState,
} = require("../controller/countryController");
const router = express.Router();

router.route("/countryAdd").post(countryAdd);
router.route("/stateAdd").post(stateAdd);
router.route("/getAllCountry").get(getAllCountry);
router.route("/country/:countryId").get(countryWiseState);
module.exports = router;
