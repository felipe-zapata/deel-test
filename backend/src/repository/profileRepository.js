const { Op } = require('sequelize')

const { Profile, Contract, Job, sequelize } = require('../model')

const getProfileById = async (id, transaction) => {
  const profile = await Profile.findByPk(id, { transaction })
  return profile
}

const upsertProfile = async (profileSent, transaction) => {
  const profile = await profileSent.save({ transaction })
  return profile
}

const getBestProfessionByTotalEarned = async (start, end) => {
  const profession = await Profile.findAll(
    {
      attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'totalEarned']],
      group: ['profession'],
      order: [[sequelize.literal('totalEarned'), 'DESC']],
      include: {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        include: {
          model: Job,
          attributes: [],
          where: {
            paid: true,
            paymentDate: { [Op.between]: [start, end] }
          }
        }
      }
    }
  )
  return profession
}

const getBestClientsByTotalPaid = async (start, end, limit) => {
  const clients = await Profile.findAll(
    {
      attributes: {
        include: [[sequelize.fn('SUM', sequelize.col('price')), 'totalPaid']]
      },
      group: ['Profile.id'],
      order: [[sequelize.literal('totalPaid'), 'DESC']],
      where: {
        type: 'client'
      },
      limit,
      subQuery: false,
      include: {
        model: Contract,
        as: 'Client',
        attributes: [],
        include: {
          model: Job,
          attributes: [],
          where: {
            paid: true,
            paymentDate: { [Op.between]: [start, end] }
          }
        }
      }
    }
  )
  return clients
}

module.exports = {
  getBestProfessionByTotalEarned,
  getBestClientsByTotalPaid,
  getProfileById,
  upsertProfile
}
