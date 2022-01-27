const encode = (str) => new TextEncoder().encode(str)

const decode = (buf) => new TextDecoder().decode(buf)
module.exports = { encode, decode }
