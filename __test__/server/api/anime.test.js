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
});
