require("dotenv").config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const MONGODB_HOST = process.env.MONGODB_HOST
const ALGOD_TOKEN =
	process.env.ALGOD_TOKEN ||
	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
const ALGOD_SERVER = process.env.ALGOD_SERVER || "http://localhost"
const ALGOD_PORT = process.env.ALGOD_PORT || 4001
const ALGOD_GH =
	process.env.ALGOD_GH || "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
const ALGOD_GID = process.env.ALGOD_GID || "testnet-v1.0"
const __rootdir = __dirname + "/../../"
const __publicdir = __rootdir + "public/"

module.exports = {
	PORT,
	SECRET,
	MONGODB_HOST,
	ALGOD_TOKEN,
	ALGOD_SERVER,
	ALGOD_PORT,
	ALGOD_GH,
	ALGOD_GID,
	__rootdir,
	__publicdir,
}
