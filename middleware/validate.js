const validator = require('../helpers/validate');

const saveTeam = (req, res, next) => {
    const validationRule = {
        captain: 'required|string',
        matches: 'required|integer',
        nation: 'required|string'
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
    saveTeam
};