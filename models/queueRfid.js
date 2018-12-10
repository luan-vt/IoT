module.exports = function (sequelize, Sequelize) {
	var Queue = sequelize.define('queueRfid', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		rfid: {
			type: Sequelize.STRING(10),
			notEmpty: true
		},

		status:{
			type: Sequelize.STRING(10),
			notEmpty: true
		},

		createdAt: {
			field: 'created_at',
			type: Sequelize.DATE,
		},
		updatedAt: {
			field: 'updated_at',
			type: Sequelize.DATE,
		},


	},{tableName: 'queue_rfid'});

	return Queue;
}