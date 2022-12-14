const router = require('express').Router();
const { Comment, Blogpost, User } = require('../../models');
const sessAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const comments = await Comment.findAll({
        include: [Blogpost, User]
    });
      res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
    const comment = await Comment.findOne({
      where: {id: req.params.id},
      include: [Blogpost, User]
  })
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
          res.status(400).json(err);
    }
  });

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
    try {
      const updateComment = await Comment.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(updateComment);
      } catch (err) {
        console.error(err);
        res.status(400).json(err);
  }}); 

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;