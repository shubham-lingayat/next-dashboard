import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        // Create an event after connection
        connection.on('Connected', ()=>{
            console.log("Mongo DB Connected Successfully");
        })

        connection.on('error', (err)=>{
            console.log("Got an Error while connecting to mongoDB: ",err)
            process.exit();
        })
    }
    catch(err){
        console.log("Not able to connect to db!");
        console.log(err);
    }
}