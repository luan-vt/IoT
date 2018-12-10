module.exports = function (sequelize, Sequelize) {
	var BorrowDevice = sequelize.define('borrowDevice', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		deviceId: {
			field: 'device_id',
			type: Sequelize.INTEGER,
			notEmpty: true,
			references: {
				model: 'list_devices',
				key: 'id'
			}
		},

		studentId: {
			field: 'student_id',
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'list_students',
				key: 'idst'
			}
		},

		status: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		//0: Ignore, 1: Đăng ký mượn, 2: Đang mượn, 3: Đã trả
		
		borrowDate: {
			field: 'borrow_date',
			type: Sequelize.DATE,
			allowNull: true
		},

		refundDate:{
			field: 'borrow_date',
			type: Sequelize.DATE,
			allowNull: true
		},

		createdAt: {
			field: 'created_at',
			type: Sequelize.DATE,
		},

		updatedAt: {
			field: 'updated_at',
			type: Sequelize.DATE,
		},


	},{tableName: 'borrow_devices'});

	
	return BorrowDevice;
}