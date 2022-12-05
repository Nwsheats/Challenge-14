const router = require('express').Router();
const { Blogpost, Comment } = require('../../models');
const sessAuth = require('../../utils/auth');

router.get('/', sessAuth, async (req, res) => {
    try {
      const blogposts = await Blogpost.findAll({
        include: [Comment]
    });
      res.status(200).json(blogposts);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
    const blogposts = await Blogpost.findOne({
      where: {id: req.params.id},
      include: [Comment]
  })
    res.status(200).json(blogposts);
  } catch (err) {
    console.error(err);
          res.status(400).json(err);
    }
  });


router.post('/', sessAuth, async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
    try {
      const updateBlogpost = await Blogpost.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(updateBlogpost);
      } catch (err) {
        console.error(err);
        res.status(400).json(err);
  }}); 


router.delete('/:id', sessAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;