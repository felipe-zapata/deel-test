const { sequelize } = require('../model')
const jobRepository = require('../repository/jobRepository')
const profileRepository = require('../repository/profileRepository')

async function depositBalanceByUserId (userId, amount) {
  return sequelize.transaction(async (transaction) => {
    const profile = await profileRepository.getProfileById(userId)
    if (!profile) {
      throw new Error('Profile not found')
    }
    if (profile.type !== 'client') {
      throw new Error('Profile is not a client')
    }

    const unpaidJobs = await jobRepository.getUnpaidJobsByProfileId(userId)
    const totalDue = unpaidJobs.reduce((acc, job) => {
      acc += job.price
      return acc
    }, 0)

    console.log(totalDue, amount)

    if (amount > totalDue * 0.25) {
      throw new Error('The amount exceeds 25% of the total due')
    }

    profile.balance += amount
    await profileRepository.upsertProfile(profile)
  })
}

module.exports = {
  depositBalanceByUserId
}
