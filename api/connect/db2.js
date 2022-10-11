import mongoose from 'mongoose' 
import dotenv from "dotenv";

dotenv.config({ path: './.env' })
mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

export const conn_ = conn;