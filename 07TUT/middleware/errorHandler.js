
const {logEvents} = require('./logEvents')
const errorHandler = (err,req,rest,next) =>{
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    rest.status(500).send(err.message);
}
module.exports =errorHandler;