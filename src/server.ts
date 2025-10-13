import dotenv from 'dotenv';
dotenv.config();

// Cluster => Database => Collection => Documents
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL as string,{}).then(
    (data) => { console.log("Connected to MongoDB");
    const PORT = process.env.PORT ?? 3000;
     }
).catch(
    (err) => { console.log(err); }  
); 