const jobService = require('../service/job')

async function getUnpaidJobs (req, res) {
  const { id: profileId } = req.profile
  const unpaidJobs = await jobService.getUnpaidJobsByProfileId(profileId)
  res.json(unpaidJobs)
}

async function payJobByJobId (req, res) {
  const { job_id: jobId } = req.params
  await jobService.payJobByJobId(req.profile, jobId)
  res.json({ message: 'Job paid' })
}

module.exports = {
  getUnpaidJobs,
  payJobByJobId
}
