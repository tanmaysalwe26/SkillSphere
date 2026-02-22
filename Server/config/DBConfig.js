import mongoose from "mongoose";


export const connectDb= async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            dbName:'SkillShare'
        });
        console.log(`mongodb connected to ${conn.connection.host} : ${conn.connection.name}`);
    } catch (error) {
        console.error(error);
    }
}