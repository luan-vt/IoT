module.exports = function (sequelize, Sequelize) {
	var Device = sequelize.define('device', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		name: {
			type: Sequelize.STRING(100),
			notEmpty: true
		},

		amount: {
			type: Sequelize.INTEGER,
			allowNull: false
		},

		remainAmount: {
			field: 'remain_amount',
			type: Sequelize.INTEGER,
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


	},{tableName: 'list_devices'});

	
	return Device;
}