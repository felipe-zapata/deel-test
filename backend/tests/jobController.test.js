const jobController = require('../src/controller/jobController')

describe('jobController', () => {
  describe('getUnpaidJobs', () => {
    it('should return unpaid jobs', async () => {
      const req = {
        profile: {
          id: 1
        }
      }
      const res = {
        json: jest.fn()
      }
      const response = await jobController.getUnpaidJobs(req, res)
      expect(res.json).toHaveBeenCalled()
    })
  })
})
