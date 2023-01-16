const { User, Thought } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllUserThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      //descending order sought by id _id value
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getOneThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'No thought has been found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create a thought
  //the body has been deconstructed
  createAThought({ body }, res) {
    Thought.create(body)
      .then(({ _id, _doc }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } }
        ).then(res.json(_doc));
      })
      .catch((err) => res.status(400).json(err));
  },

  // update thought by id
  updateAThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete thought
  deleteAThought({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'No thought has been found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addAReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      // use $addToSet to block duplicates instead of $push
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeAReaction({ params }, res) {
    console.log('wegothere');

    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);

        res.json(err);
      });
  },
};

module.exports = thoughtController;
