const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const AnimeHelper = require('../helpers/AnimeHelper');

const getAllAnime = async (req, res) => {
  try {
    // get data from json
    const data = await AnimeHelper.getAnimeListName();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Anime', 'Get All Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const searchAnime = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.searchAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByName(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Search Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnimeDetail = async (req, res) => {
  try {
    ValidationHelper.animeByIDValidation(req.params);
    const data = await AnimeHelper.getAnimeDetailbyId(req.params.id);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get Anime Detail', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnime = async (req, res) => {
  try {
    const data = await AnimeHelper.getAnimeList(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const filterAnime = async (req, res) => {
  try {
    ValidationHelper.filterAnimeValidation(req.body);
    const data = await AnimeHelper.filterAnimeList(req.body);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Filter Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const filterEpisode = async (req, res) => {
  try {
    const data = await AnimeHelper.filterAnimeEpisode();
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Filter Episode', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
const animeEpisode = async (req, res) => {
  try {
    ValidationHelper.searchEpisodeValidation(req.body);
    const data = await AnimeHelper.searchAnimeEpisode(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Anime Episode', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};
router.get('/list', CommonHelper.preHandler, getAllAnime);
router.post('/search', CommonHelper.preHandler, searchAnime);
router.get('/detail/:id', CommonHelper.preHandler, getAnimeDetail);
router.get('/listanime', CommonHelper.preHandler, getAnime);
router.post('/filter', CommonHelper.preHandler, filterAnime);
router.get('/episode', CommonHelper.preHandler, filterEpisode);
router.post('/eps', CommonHelper.preHandler, animeEpisode);
module.exports = router;
