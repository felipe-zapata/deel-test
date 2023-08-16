const { sequelize } = require('../model')
const jobRepository = require('../repository/jobRepository')
const contractRepository = require('../repository/contractRepository')
const profileRepository = require('../repository/profileRepository')

async function getUnpaidJobsByProfileId (profileId) {
  return await jobRepository.getUnpaidJobsByProfileId(profileId)
}

async function payJobByJobId (profile, jobId) {
  const { id: profileId, balance } = profile
  return sequelize.transaction(async (transaction) => {
    const job = await jobRepository.getJobById(jobId, transaction)
    if (!job) {
      throw new Error('Job not found')
    }
    const { paid, price, ContractId } = job
    if (paid) {
      throw new Error('Job already paid')
    }
    const contract = await contractRepository.getContractById(ContractId, profileId, transaction)
    if (!contract) {
      throw new Error('Contract not found')
    }
    if (contract?.ClientId !== profileId) {
      throw new Error('Contract does not belong to the client')
    }
    if (balance < price) {
      throw new Error('Insufficient balance')
    }

    profile.balance -= price
    await profileRepository.upsertProfile(profile, transaction)

    const contractorProfile = await profileRepository.getProfileById(contract?.ContractorId)
    contractorProfile.balance += price
    await profileRepository.upsertProfile(contractorProfile, transaction)

    job.paid = true
    job.paymentDate = new Date()
    await jobRepository.upsertJob(job, transaction)
  })
}

module.exports = {
  getUnpaidJobsByProfileId,
  payJobByJobId
}
