const { Op } = require('sequelize')

const { Job, Contract } = require('../model')

async function getUnpaidJobsByProfileId (profileId) {
  const jobs = await Job.findAll({
    where: {
      paid: {
        [Op.not]: true
      }
    },
    include: [{
      model: Contract,
      where: {
        [Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId }
        ],
        status: 'in_progress'
      }
    }]
  })

  return jobs
}

async function getJobById (jobId, transaction) {
  return await Job.findByPk(jobId, { transaction })
}

async function upsertJob (jobToUpdate, transaction) {
  return jobToUpdate.save({ transaction })
}

module.exports = {
  getUnpaidJobsByProfileId,
  getJobById,
  upsertJob
}
