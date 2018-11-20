module.exports = function (sequelize, Sequelize) {
	var User = sequelize.define('user', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		name: {
			type: Sequelize.STRING,
			notEmpty: true
		},

		username: {
			type: Sequelize.STRING(20),
			notEmpty: true
		},

		password: {
			type: Sequelize.STRING,
			allowNull: false
		},

		createdAt: {
			field: 'created_at',
			type: Sequelize.DATE,
		},
		updatedAt: {
			field: 'updated_at',
			type: Sequelize.DATE,
		},


	});

	return User;
}