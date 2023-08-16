const { Op } = require('sequelize')

const { Contract } = require('../model')

async function getContractById (contractId, profileId, transaction) {
  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId }
      ]
    },
    transaction
  })

  return contract
}

async function getContractsByProfileId (profileId) {
  const contracts = await Contract.findAll({
    where: {
      [Op.not]: { status: 'terminated' },
      [Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId }
      ]
    }
  })

  return contracts
}

module.exports = {
  getContractById,
  getContractsByProfileId
}
