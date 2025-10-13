import dotenv from 'dotenv';
dotenv.config();
import app from './app';

// Cluster => Database => Collection => Documents
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL as string,{}).then(
    (data) => { console.log("Connected to MongoDB");
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); } );
     }
).catch(
    (err) => { console.log(err); }  
); 