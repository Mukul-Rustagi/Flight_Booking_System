const Redis=require('ioredis');
const dotenv=require('dotenv');

const client=Redis.createClient({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT
});

client.on('connect',()=>{
    console.log('Connected to Redis....');
})

client.on('error',(err)=>{
    console.log('Error connecting to redis',err);
});

module.exports=client;