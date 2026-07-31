const validator = require('../helpers/validate');

const saveTeam = (req, res, next) => {
    const validationRule = {
        captain: 'required|string',
        matches: 'required|integer',
        nation: 'required|string',
        confederation: 'required|string',
        group: 'required|string',
        coach: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveWc = (req, res, next) => {
    const validationRule = {
        coach: 'required|string',
        final_position: 'required|string',
        host: 'required|string',
        iconic_moment: 'required|string',
        top_scorer: 'required|string',
        year: 'required|integer'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveTeam,
    saveWc
};