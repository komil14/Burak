import dotenv from 'dotenv';
dotenv.config();

console.log('Server is running on port:', process.env.PORT);
console.log('MongoDB URL:', process.env.MONGO_URL);
