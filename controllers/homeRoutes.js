// home route


//login and signup route

// get route with login
// render login page


//find the posts
//find a post
//login

const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('homepage')
})



module.exports = router;