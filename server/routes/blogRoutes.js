const express = require('express')
const { createBlog, getAllBlog, getSingleBlog, updateBlog, deleteBlog, postComments, getAllComments, addLike, unLike, saveBlog, unsaveBlog, trendingBlog, deleteComments, getBlogBySearch, getBlogByFollowing } = require('../controllers/blogController')
const { isAuthenticateUser } = require('../middleware/authenticate')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/blogs'))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

router.route('/').post(isAuthenticateUser, upload.single('thumbnail'), createBlog)
router.route('/').get(getAllBlog)
router.route('/trending').get(trendingBlog)
router.route('/searchblogs').get(getBlogBySearch)
router.route('/followingblogs').get(isAuthenticateUser, getBlogByFollowing)
router.route('/:id').get(getSingleBlog)
router.route('/:id').put(isAuthenticateUser, upload.single('thumbnail'), updateBlog)
router.route('/:id').delete(isAuthenticateUser, deleteBlog)
router.route('/comments/:id').post(isAuthenticateUser, postComments)
router.route('/comments/:id').get(getAllComments)
router.route('/comments/:id').delete(isAuthenticateUser, deleteComments)
router.route('/like/:id').put(isAuthenticateUser, addLike)
router.route('/unlike/:id').put(isAuthenticateUser, unLike)
router.route('/saveblog/:id').put(isAuthenticateUser, saveBlog)
router.route('/unsaveblog/:id').put(isAuthenticateUser, unsaveBlog)


module.exports = router