module.exports = (sequelize, DataTypes) => {

    return sequelize.define('posting', {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image3: {
            type: DataTypes.STRING,
            allowNull: true,
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

        writer: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        timestamps: false,
    });
  };