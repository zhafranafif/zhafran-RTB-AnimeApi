const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');

const list = async (req, res) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countryList = await response.json();
    const data = countryList.map((country) => ({
      name: country.name.common,
      code: country.cca2
    }));
    res.send(data);
  } catch (error) {
    return CommonHelper.errorResponse(error);
  }
};

router.get('/list', CommonHelper.preHandler, list);

module.exports = router;
