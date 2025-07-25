//chapter two - Read and Write Files
const fspromises = require('fs').promises;
const path = require('path')

const fileOps = async() =>{
    try{
         const data = await fspromises.readFile(path.join(__dirname,'files','starter.txt'), 'utf8')
         console.log(data)
         await fspromises.unlink(path.join(__dirname,'files','starter.txt'))
         await fspromises.writeFile(path.join(__dirname,'files','promiseWrite.txt'),data)
         await fspromises.appendFile(path.join(__dirname,'files','promiseWrite.txt'),'\n\n Nice to meet you.')
         await fspromises.rename(path.join(__dirname,'files','promiseWrite.txt'),path.join(__dirname,'files','promiseComplete.txt'))
         const newData = await fspromises.readFile(path.join(__dirname,'files','promiseComplete.txt'), 'utf8')
         console.log(newData)

    }catch (err){
        console.log(err);
        
    }
}

fileOps();

// //read files
// fs.readFile(path.join(__dirname,'files','starter.txt'), 'utf8', (err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

console.log('Hello...');


// //write files
// fs.writeFile(path.join(__dirname,'files','reply.txt'), 'Nice to meet you.', (err) =>{
//     if(err) throw err;
//     console.log('Write complete');
// })

// //append/updating files
// fs.appendFile(path.join(__dirname,'files','reply.txt'), '\n\n Yes it is.', (err) =>{
//     if(err) throw err;
//     console.log('Append complete');

//     //rename file
//     fs.rename(path.join(__dirname,'files','reply.txt'), path.join(__dirname,'files','newReply.txt'), (err) =>{
//     if(err) throw err;
//     console.log('Rename complete');
//     })

// })



process.on('uncaughtException', err =>{
    console.error(`there was uncought error: ${err}`);
    process.exit(1);
})