const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Argentina World Cup']
    try {
        const result = await mongodb
            .getDatabase()
            .db('project2')
            .collection('arg_wc')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching Argentina World Cup.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Argentina World Cup']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to find a World Cup.');
    }

    try {
        const wcId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('project2')
            .collection('arg_wc')
            .find({ _id: wcId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'World Cup not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching the World Cup.' });
    }
};

const createWc = async (req, res) => {
    //#swagger.tags=['Argentina World Cup']
    const wc = {
        coach: req.body.coach,
        final_position: req.body.final_position,
        host: req.body.host,
        iconic_moment: req.body.iconic_moment,
        top_scorer: req.body.top_scorer,
        year: req.body.year
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('arg_wc')
            .insertOne(wc);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the World Cup.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the World Cup.' });
    }
};

const updateWc = async (req, res) => {
    //#swagger.tags=['Argentina World Cup']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact id to update a World Cup.' });
    }

    try {
        const wcId = new ObjectId(req.params.id);
        const wc = {
            coach: req.body.coach,
            final_position: req.body.final_position,
            host: req.body.host,
            iconic_moment: req.body.iconic_moment,
            top_scorer: req.body.top_scorer,
            year: req.body.year
        };

        const response = await mongodb
            .getDatabase()
            .db('project2') 
            .collection('arg_wc')
            .replaceOne({ _id: wcId }, wc);

        console.log("Respuesta de MongoDB:", response);

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No wc found with that ID.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the World Cup.' });
    }
};

const deleteWc = async (req, res) => {
    //#swagger.tags=['Argentina World Cup']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to delete a contact.')
    }
    try {
        const wcId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('arg_wc')
            .deleteOne({ _id: wcId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the World Cup.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the World Cup.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createWc,
    updateWc,
    deleteWc
};
