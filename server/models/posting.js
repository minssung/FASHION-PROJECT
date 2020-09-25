module.exports = (sequelize, DataTypes) => {

    return sequelize.define('posting', {
        postting_num: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.BLOB('LONG'),
            allowNull: false,
        },

        top_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        outer_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bottom_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shoes_tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        like: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING,
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