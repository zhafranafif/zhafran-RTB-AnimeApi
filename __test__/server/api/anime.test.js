const Request = require('supertest');

const TestHelper = require('../../../server/helpers/TestHelper');
const GeneralHelper = require('../../../server/helpers/GeneralHelper');
const anime = require('../../../server/api/anime');

let server;
describe('Anime', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1/anime', anime);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Get All Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(200);
    });
  });

  describe('Search Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
      expect(response.status).toBe(500);
    });

    test('should return 400', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ movie: 'Naruto' });
      expect(response.status).toBe(400);
    });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Ashiap Man' });
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
      expect(response.status).toBe(200);
    });
  });
  describe('Get Anime Detail', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/detail/1');
      expect(response.status).toBe(500);
    });

    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/19902');
      expect(response.status).toBe(200);
    });
    test('should return 404', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/35000');
      expect(response.status).toBe(404);
    });
    test('should return 400', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/abc');
      expect(response.status).toBe(400);
    });
  });
  describe('Get Anime List', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/listanime');
      expect(response.status).toBe(500);
    });

    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/listanime');
      expect(response.status).toBe(200);
    });
  });
  describe('Filter Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server)
        .post('/api/v1/anime/filter')
        .send({ genre: 'shounen', status: ['FINISHED'] });
      expect(response.status).toBe(500);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/filter').send({ genre: 'shounen' });
      expect(response.status).toBe(200);
    });
    test('should return 200 with genre array', async () => {
      const response = await Request(server)
        .post('/api/v1/anime/filter')
        .send({ genre: ['shounen', 'mystery'], status: ['FINISHED'] });
      expect(response.status).toBe(200);
    });
    test('should return 400', async () => {
      const response = await Request(server)
        .post('/api/v1/anime/filter')
        .send({
          genre: 1,
          status: ['FINISHED']
        });
      expect(response.status).toBe(400);
    });
  });
  describe('Filter Episode Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/episode');
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/episode');
      expect(response.status).toBe(200);
    });
  });

  describe('Search Anime Episode', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server)
        .post('/api/v1/anime/eps')
        .send({ title: 'Boruto: Naruto Next Generations' });
      expect(response.status).toBe(500);
    });
    test('should return 400', async () => {
      const response = await Request(server)
        .post('/api/v1/anime/eps')
        .send({ title: { movie: 'Naruto' } });
      expect(response.status).toBe(400);
    });
    test('should return 404', async () => {
      const response = await Request(server).post('/api/v1/anime/eps').send({ title: 'Ashiap Man' });
      expect(response.status).toBe(404);
    });
    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/eps').send({ title: 'Naruto' });
      expect(response.status).toBe(200);
    });
  });
});
