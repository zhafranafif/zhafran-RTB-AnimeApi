const Path = require('path');
const Boom = require('boom');
const CommonHelper = require('./CommonHelper');
const GeneralHelper = require('./GeneralHelper');

const ANIME_DATA = Path.join(
  __dirname,
  process.env.NODE_ENV === 'test' ? '../../assets/anime-test.json' : '../../assets/anime.json'
);

const getAnimeListName = async () => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeName = data.map((item) => item.title);
    return {
      count: data.length,
      list: animeName
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeListName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByName = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.filter((item) => item.title.toLowerCase().includes(req.body.name.toLowerCase()));

    if (animeDetail.length === 0) {
      return Boom.notFound('Anime not found');
    }
    const animeList = animeDetail.map((item) => item.title);

    return {
      count: animeDetail.length,
      list: animeList,
      detail: animeDetail
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeDetailbyId = async (id) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.find((item) => item.id === Number(id));

    if (!animeDetail) {
      throw Boom.notFound(`Anime with id ${id} doesn't exist`);
    }
    return {
      id: animeDetail.id,
      title: animeDetail.title,
      type: animeDetail.type,
      episodes: animeDetail.episodes,
      status: animeDetail.status,
      picture: animeDetail.picture,
      thumbnail: animeDetail.thumbnail,
      genre: animeDetail.genre
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeDetailbyId', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeList = async (req) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const defaultList = data.slice(Number(offset), Number(offset) + Number(limit));
    return {
      count: defaultList.length,
      list: defaultList
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const filterAnimeList = async (body) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const { genre, status } = body;
    const filteredAnimebyGenre = data.filter((item) => {
      const tag = Array.isArray(genre) ? genre : [genre];
      return item.tags.every((tagItem) => tag.includes(tagItem));
    });
    if (status) {
      const filteredAnimebyStatus = data.filter((item) => item.status === status);
      return {
        count: filteredAnimebyStatus.length,
        list: filteredAnimebyStatus
      };
    }
    return {
      count: filteredAnimebyGenre.length,
      list: filteredAnimebyGenre
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'filterAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const filterAnimeEpisode = async () => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const filteredAnime = data.filter((item) => item.episodes > 100 && item.episodes < 500);
    return {
      list: filteredAnime
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'filterAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const searchAnimeEpisode = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const episodeAnime = data.filter((item) => item.title.toLowerCase().includes(req.body.title.toLowerCase()));

    if (episodeAnime.length === 0) {
      return Boom.notFound('Anime not found');
    }

    const result = episodeAnime.map((item) => ({
      id: item.id,
      title: item.title,
      episodes: item.episodes
    }));

    return {
      data: result
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'searchEpisodeAnime', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};
module.exports = {
  getAnimeListName,
  getAnimeByName,
  getAnimeDetailbyId,
  getAnimeList,
  filterAnimeList,
  filterAnimeEpisode,
  searchAnimeEpisode
};
