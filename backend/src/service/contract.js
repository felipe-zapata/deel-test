const contractRepository = require('../repository/contractRepository')

async function getContractById (id, profileId) {
  return await contractRepository.getContractById(id, profileId)
}

async function getContractsByProfileId (profileId) {
  return await contractRepository.getContractsByProfileId(profileId)
}

module.exports = {
  getContractById,
  getContractsByProfileId
}
