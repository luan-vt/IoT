var exports = module.exports = {}
var models = require("../models");

exports.addRfid = (req, res) => {	

	var rfid = req.body.rfid
	var mssv = parseInt(req.body.mssv)

	models.student.update(
		{ rfid: rfid }, 
		{ where: {id: mssv} }
	).then((rowUpdated) => {
	   if (rowUpdated == 0){
	   		req.flash('message', '<div class="alert alert-danger" role="alert">Không có thay đổi được cập nhật</div>')
	   }
	   else{
	   		req.flash('message', '<div class="alert alert-info" role="alert">Cập nhật mã RFID cho sinh viên thành công</div>')
	   }
	   res.redirect("/")
	});

	// User.update(
	// 	{ rfid: rfid},
	// 	{where: {idst:mssv}}

	// ).then(function() {
	//     res.render('index')

	// }).catch(function(e) {
	//     res.render('index')
	// })
};