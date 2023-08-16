const express = require('express')
const asyncHandler = require('express-async-handler')

const { getProfile } = require('./middleware/getProfile')
const contractController = require('./controller/contractController')
const jobController = require('./controller/jobController')
const profileController = require('./controller/profileController')
const adminController = require('./controller/adminController')

const router = express.Router()

router.get('/contracts/', getProfile, asyncHandler(contractController.getContracts))
router.get('/contracts/:id', getProfile, asyncHandler(contractController.getContractById))

router.get('/jobs/unpaid', getProfile, asyncHandler(jobController.getUnpaidJobs))
router.post('/jobs/:job_id/pay', getProfile, asyncHandler(jobController.payJobByJobId))

router.post('/balances/deposit/:userId', asyncHandler(profileController.depositBalanceByUserId))

router.get('/admin/best-profession', getProfile, asyncHandler(adminController.getBestProfession))
router.get('/admin/best-clients', getProfile, asyncHandler(adminController.getBestClients))

module.exports = router
