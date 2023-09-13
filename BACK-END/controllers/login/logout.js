const { response } = require('express'); // Importa 'response' de 'express'

const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ status: 'Success' });
};

module.exports = {
    logout
};
