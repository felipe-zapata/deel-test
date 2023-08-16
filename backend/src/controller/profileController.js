const profileService = require('../service/profile')

async function depositBalanceByUserId (req, res) {
  const { userId } = req.params
  const { amount } = req.body

  await profileService.depositBalanceByUserId(userId, amount)

  res.json({ message: 'Balance deposited' })
}

module.exports = {
  depositBalanceByUserId
}
