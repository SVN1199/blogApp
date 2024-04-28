const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, getUser, updateProfile, createAboutSection, getAboutMe,
    changePassword, users, getPostsByUser, countBlogs, userByParams, getUserPostsBySaved, followUser, unfollowUser, getFollowers, getFollowing, getFollowersAndFollowing, getUserFollowersAndFollowing, forgotPassword, resetPassword, userContact, getUserContact, deleteContact, deleteMyAccount, getAllUsers, reportByUserToBlog, reportUserByUsers, userContactToAdmin, confirmPasswordAccount } = require('../controllers/userController')
const { isAuthenticateUser } = require('../middleware/authenticate')
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/user'))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})


router.route('/').post(upload.single('avatar'), registerUser)
router.route('/').put(isAuthenticateUser, upload.single('avatar'), updateProfile)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/getuser').get(isAuthenticateUser, getUser)
router.route('/changepassword').put(isAuthenticateUser, changePassword)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:token').post(resetPassword);

//userprofile
router.route('/users').get(isAuthenticateUser, users)
router.route('/count/:id').get(countBlogs)
router.route('/getposts/:id').get(getPostsByUser)
router.route('/getuserbyparams/:id').get(userByParams)
router.route('/getuserpostsbysaved/:id').get(getUserPostsBySaved)

// about section
router.route('/about/:id').put(isAuthenticateUser, createAboutSection)
router.route('/about/:id').get(getAboutMe)


// follow and unfollow the user
router.route('/follow/:id').put(isAuthenticateUser, followUser)
router.route('/unfollow/:id').put(isAuthenticateUser, unfollowUser)
router.route('/getfollowersfollowing/:id').get(isAuthenticateUser, getFollowersAndFollowing)
router.route('/getuserfollowersfollowing/:id').get(isAuthenticateUser, getUserFollowersAndFollowing)


router.route('/usercontact/:id').put(isAuthenticateUser, userContact)
router.route('/usercontact/:id').get(isAuthenticateUser, getUserContact)
router.route('/usercontact/:id').delete(isAuthenticateUser, deleteContact)
router.route('/usercontactadmin').put(isAuthenticateUser, userContactToAdmin)


// delete my accounts
router.route('/deletemyaccount/:id').delete(isAuthenticateUser, deleteMyAccount)
router.route('/confirmpassword/:id').post(isAuthenticateUser, confirmPasswordAccount)

// get all users
router.route('/getallusers').get(isAuthenticateUser, getAllUsers)

// reports
router.route('/reportblog/:id').put(isAuthenticateUser, reportByUserToBlog)
router.route('/reportuser/:id').put(isAuthenticateUser, reportUserByUsers)

module.exports = router