module.exports = function (sequelize, Sequelize) {
	var Student = sequelize.define('student', {
		id: {
			field: 'idst',
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		rfid: {
			type: Sequelize.STRING(10),
			notEmpty: true
		},

		name: {
			type: Sequelize.STRING(100),
			notEmpty: true
		},

		class: {
			type: Sequelize.STRING(10),
			allowNull: false
		},

		faculty: {
			type: Sequelize.STRING(10),
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


	},{tableName: 'list_students'});

	return Student;
}