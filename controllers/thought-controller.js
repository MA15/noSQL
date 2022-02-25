const {thought, user} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id})
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message:' No thought with this ID'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({ body }, res) {
        thought.create(body)
        .then(dbThoughtData => {
            user.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.id }, body,{ new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID'});
                return;
            }

            user.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: { thoughts: params.id } }
            )

            .then(() => { res.json({message: 'Deleted'});
            })
            .catch(err => res.status(500).json(err));
        });
    },


    addReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;