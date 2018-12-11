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

};

exports.checkin = (req, res) => {	
	var rfid = null;
	//Read rfid queue
	models.queueRfid.findOne(
		{where: {status: 'queue'}}
	).then(rfid=>{
		if (rfid == null){
			res.render('index', {view:'checkin/index', message: req.flash('message'), type: 0})
		}
		else{
			//Find student by rfid
			models.student.findOne({
				where: {rfid: rfid.rfid}
			}).then(student=>{
				if ( student == null)
					res.render('index', {view:'checkin/index', message: req.flash('message'), type: 1, rfid: rfid})
				else{
					newList = []
					borrowList = []
					//Get new

					models.borrowDevice.findAll({
						where:{status: 1,
								studentId: student.id
								},
						 include: [{
						    model: models.device,
						    required: true
						   }]
					}).then(newList =>{
						//Get borrow
						models.borrowDevice.findAll({
							where:{
								status: 2,
								studentId: student.id
							},
							include: [{
						    model: models.device,
						    required: true
						   }]
						}).then(borrowList =>{

							res.render('index', {view:'checkin/index', message: req.flash('message'), type: 2, newList: newList, borrowList:borrowList, student:student, rfid:rfid})
						})
					})
				}
			})
		}
	})
};


exports.newList = (req, res) => {	
	listItems = req.body.ckb_new_list
	if (typeof listItems == "undefined")
		listItems = []
	student = req.body.studentId;

	models.borrowDevice.update({status:2},
		{
			where:{
				status: 1,
				studentId: student,
				id: {$in: listItems}
			}
		}).then(inList=> {
			models.borrowDevice.update({status:0},
			{
				where:{
					status: 1,
					studentId: student,	
					id: {$notIn: listItems}
				}
			}).then(notInList =>{
				models.queueRfid.findOne({
					where: {status:'queue'}
				}).then(queue =>{
					queue.status = "finished"
					queue.save();
					res.redirect("/")	
				})
			})
		})
};

exports.returnList = (req, res) => {	
	items = req.body.ckb_borrow_list
	if (typeof listItems == "undefined")
		listItems = []
	student = req.body.studentId;

	models.borrowDevice.update({status:3},
		{
			where:{
				status: 2,
				studentId: student,
				id: {$in: items}
			}
		}).then(inList=> {
			models.queueRfid.findOne({
				where: {status:'queue'}
			}).then(queue =>{
				queue.status = "finished"
				queue.save();
				res.redirect("/")	
			})	
	})
};



exports.reg = (req, res) => {	
	models.device.findAll({
		where:{
			remainAmount: {$gt: 0}
		}
	}).then(devices=>{
		res.render('regDevice', {devices:devices, message: req.flash("message")})
		
	})
};

exports.postReg = (req, res) => {	
	regDevice = req.body.reg_devices
	if (typeof regDevice == "undefined")
		regDevice = []
	mssv = req.body.mssv
	success = "Đăng ký thiết bị "
	messages = []

	models.student.findOne({
		where: {
			id: mssv
		}
	}).then(student=>{
		if (student != null){
			for(var i = 0; i < regDevice.length; i++){
			//Check available
				models.device.findOne({
					where:{
						id: regDevice[i],
						remainAmount: {$gt: 0}
					}
				}).then(device=>{
					if (device != null){
						models.borrowDevice.create({
							deviceId: device.id,
							studentId: mssv,
							status: 1
						}).then(borrowDevice =>{
							device.remainAmount -= 1,
							device.save()
						}).catch(err=>{
						})
					}
					else{
					}
				})
			}
		}else{
		}
	})

	req.flash('message', "Đã đăng thực hiện đăng ký")
	res.redirect("/reg-device")
};

exports.ignore = (req, res) => {
	rfid = req.body.rfid	
	models.queueRfid.update({
		status: 'ignore',
	},
	{
		where:{
			id: rfid
		}
	}).then(updated=>{
		res.redirect('/')
		
	})
};

exports.checkQueue = (req, res) => {	
	models.queueRfid.count({
		where: {
			status : 'queue'
		}
	}).then(count=>{
		if (count > 0)
			res.status(200).send("OK")
		else
			res.status(200).send("Nothing")
		
	})
};