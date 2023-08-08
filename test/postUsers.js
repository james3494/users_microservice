const executeTests = require('./executeTests')


module.exports = () => executeTests({ 
	testData: "postUsers", 
	description: "POST /user",
	endpoint: "users",
	method: "post"
})


