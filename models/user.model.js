module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        mail: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.BOOLEAN
        }
    });
    return User;
};