const request = require('supertest')
const app = require('../routes/projectRoute')


    // beforeEach(() => {
    //     jest.setTimeout(60000);
    //   });
    jest.useRealTimers();
  it('should fetch a single project', async () => {
    const projectId = 1;
    const res = await request(app).get(`/api/project/${projectId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('project');
  });
