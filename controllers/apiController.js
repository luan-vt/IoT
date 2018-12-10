var exports = module.exports = {}
var models = require("../models");

exports.addQueue = (req, res) => {	

	rfid = req.params.id
	models.queueRfid.create({
		rfid: rfid,
		status: 'queue'
	}).then(queue =>{
		res.status(200).send("OK")
	}).catch(err =>{
		console.log(err)
		res.status(400).send("Error")
	})
};