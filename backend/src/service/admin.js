const profileRepository = require('../repository/profileRepository')

async function getBestProfessionByTotalEarned (start, end) {
  const bestProfessionOrdered = await profileRepository.getBestProfessionByTotalEarned(start, end)
  return bestProfessionOrdered[0]
}

async function getBestClientsByTotalPaid (start, end, limit) {
  const bestClientsOrdered = await profileRepository.getBestClientsByTotalPaid(start, end, limit)
  return bestClientsOrdered
}

module.exports = {
  getBestProfessionByTotalEarned,
  getBestClientsByTotalPaid
}
