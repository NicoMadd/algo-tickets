const express = require("express")
const { grantToken } = require("../utils/middlewares")
const router = express.Router()

router.route("/").get(async (req, res) => {
	res.status(200).send({ token: await grantToken() })
})

module.exports = { router }
