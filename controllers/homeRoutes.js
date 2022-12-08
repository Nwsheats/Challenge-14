// home route


//login and signup route

// get route with login
// render login page


//find the posts
//find a post
//login

const router = require('express').Router();

router.get('/', async (req, res) => {
    const data = [{
        name: 'John Stone',
        blogposts: [{
            title: 'Tech Demo',
            contents: 'This is a tech demo',
            date_created: '12/7/2022'
        }]
    }];
    res.render('homepage', {data})
});


router.get('/login', async (req, res) => {
    res.render('login')
});

module.exports = router;