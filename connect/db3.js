import mongoose from "mongoose";

export const wrapperConnect = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const conn = mongoose.connection;

  conn.on("error", () => console.error.bind(console, "connection error"));

  conn.once("open", () => console.info("Connection to Database is successful"));

  return conn;
};
