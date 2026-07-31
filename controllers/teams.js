const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Teams']
    try {
        const result = await mongodb
            .getDatabase()
            .db('project2')
            .collection('teams')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching teams.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Teams']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to find a team.');
    }

    try {
        const teamId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('project2')
            .collection('teams')
            .find({ _id: teamId })
            .toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while fetching the team.' });
    }
};

const createTeam = async (req, res) => {
    //#swagger.tags=['Teams']
    const team = {
        captain: req.body.captain,
        matches: req.body.matches,
        nation: req.body.nation,
        confederation: req.body.confederation,
        group: req.body.group,
        coach:req.body.coach
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('teams')
            .insertOne(team);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the team.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the team.' });
    }
};

const updateTeam = async (req, res) => {
    //#swagger.tags=['Teams']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact id to update a team.' });
    }

    try {
        const teamId = new ObjectId(req.params.id);
        const team = {
            captain: req.body.captain,
            matches: req.body.matches,
            nation: req.body.nation,
            confederation: req.body.confederation,
            group: req.body.group,
            coach: req.body.coach
        };

        const response = await mongodb
            .getDatabase()
            .db('project2') 
            .collection('teams')
            .replaceOne({ _id: teamId }, team);

        console.log("Respuesta de MongoDB:", response);

        if (response.modifiedCount > 0 || response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No team found with that ID.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the team.' });
    }
};

const deleteTeam = async (req, res) => {
    //#swagger.tags=['Teams']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid contact id to delete a contact.')
    }
    try {
        const teamId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('teams')
            .deleteOne({ _id: teamId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the team.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the team.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeam,
    updateTeam,
    deleteTeam
};
