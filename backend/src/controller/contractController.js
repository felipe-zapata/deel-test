const contractService = require('../service/contract')

async function getContractById (req, res) {
  const { id } = req.params
  const { id: profileId } = req.profile
  const contract = await contractService.getContractById(id, profileId)
  if (!contract) return res.status(404).json({ message: `Contract ${id} not found` })
  res.json(contract)
}

async function getContracts (req, res) {
  const { id: profileId } = req.profile
  const contracts = await contractService.getContractsByProfileId(profileId)
  res.json(contracts)
}

module.exports = {
  getContractById,
  getContracts
}
