module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: { 
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.BOOLEAN
        }
    });
    return User;
};