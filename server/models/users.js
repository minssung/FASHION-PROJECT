module.exports = (sequelize, DataTypes) => {

    return sequelize.define('user', {
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        nick: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },

        follower: {
            type: DataTypes.JSON,
            allowNull: true,
        },

        follow: {
            type: DataTypes.JSON,
            allowNull: true,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },

    }, {
        timestamps: false,
    });
  };