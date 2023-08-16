const adminService = require('../service/admin')

async function getBestProfession (req, res) {
  const { start, end } = req.query
  const bestProfession = await adminService.getBestProfessionByTotalEarned(start, end)
  res.send(bestProfession)
}

async function getBestClients (req, res) {
  const { start, end, limit = 2 } = req.query
  const bestClients = await adminService.getBestClientsByTotalPaid(start, end, limit)
  res.send(bestClients)
}

module.exports = {
  getBestClients,
  getBestProfession
}
