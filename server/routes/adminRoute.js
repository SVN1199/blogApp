const express = require('express')
const { getBlogFeatures, getAllUsersByAdmin, isActiveUserByAdmin, getUserBlogsByAdmin, isActiveBlogByAdmin, getUserContactByAdmin, getBlogReportsByAdmin, getUserReportsByAdmin, getAllReports, blogReportDelete, userReportDelete, deleteUserContactByaAdmin, getAllBlogsByAdmin, isActiveToBlog } = require('../controllers/adminController')

const { isAuthenticateUser, authorizeRoles } = require('../middleware/authenticate')
const router = express.Router()

router.route('/').get(isAuthenticateUser, authorizeRoles('admin'), getBlogFeatures)
router.route('/users').get(isAuthenticateUser, authorizeRoles('admin'), getAllUsersByAdmin)
router.route('/blogs').get(isAuthenticateUser, authorizeRoles('admin'), getAllBlogsByAdmin)
router.route('/users/isactiveuser').put(isAuthenticateUser, authorizeRoles('admin'), isActiveUserByAdmin)
router.route('/users/isactiveblog').put(isAuthenticateUser, authorizeRoles('admin'), isActiveBlogByAdmin)
router.route('/users/blogs/:id').get(isAuthenticateUser, authorizeRoles('admin'), getUserBlogsByAdmin)
router.route('/usercontactadmin').get(isAuthenticateUser, authorizeRoles('admin'), getUserContactByAdmin)
router.route('/deleteusercontactadmin').put(isAuthenticateUser, authorizeRoles('admin'), deleteUserContactByaAdmin)
router.route('/getblogreports/:id').get(isAuthenticateUser, authorizeRoles('admin'), getBlogReportsByAdmin)
router.route('/getuserreports/:id').get(isAuthenticateUser, authorizeRoles('admin'), getUserReportsByAdmin)
router.route('/getallreports').get(isAuthenticateUser, authorizeRoles('admin'), getAllReports)
router.route('/deleteblogreports/:id').put(isAuthenticateUser, authorizeRoles('admin'), blogReportDelete)
router.route('/deleteuserreports/:id').put(isAuthenticateUser, authorizeRoles('admin'), userReportDelete)
router.route('/activetoblog').put(isAuthenticateUser, authorizeRoles('admin'), isActiveToBlog)

module.exports = router