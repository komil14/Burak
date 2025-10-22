import dotenv from 'dotenv';
dotenv.config();
import app from './app';

// Cluster => Database => Collection => Documents
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL as string,{}).then(
    (data) => { console.log("Connected to MongoDB");
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, () => { 
        console.info(`Server is running on port ${PORT}`);
        console.info(`http://localhost/:${PORT}/admin\n`); 
    });
     }
).catch(
    (err) => { console.error(err); }  
);