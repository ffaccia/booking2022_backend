import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
import { default as doDotEnv } from "./config/config.js";
import { __filename, __dirname } from "./commons/_Gen090.js"

doDotEnv();

console.log("ffff")
console.log(__dirname(fileURLToPath(import.meta.url)))
console.log(__filename(fileURLToPath(import.meta.url)))

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${label}] ${timestamp} ${level}: ${message}`;
    //return ` [${label}] ${level}: ${message}`;
});

//console.log(path.join(__dirname, process.env.LOGNAME))

const logger = createLogger({
  format: combine(
    //label({ label: 'logging: ' }),
    //timestamp(),
    myFormat
    //prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ 
        filename: 
           path.join(".", process.env.LOGNAME)})
  ]
})

export const dolog = (message, 
                    level="info",
                    label="_",
                    timestamp=new Date().getTime()) => {
        logger.log({
            level: level,
            message: message,
            label: label,
            timestamp: `${timestamp} - ${new Date()}`
        });
}

export const dolog2 = (message, 
                        level="info",
                        label="",
                        timestamp=new Date().getTime()) => {
    // var dateFormat= new Date(timestamp);
    // var timestamp2 = `${dateFormat.getFullYear()}-
    //                   ${dateFormat.getMonth()}-
    //                   ${dateFormat.getDate()} 
    //                   ${dateFormat.getHours()}:
    //                   ${dateFormat.getMinutes()}:
    //                   ${dateFormat.getSeconds()}`
    return logger.log({
        level: level,
        message: message,
        label: label,
        timestamp: `${timestamp} - ${new Date().toISOString()}`
    });
}


export const dolog3 = 
    ({message,
      level="info",
      label="winston logger",
      timestamp=new Date().getTime()}) => {
console.log("dentro dolog3")
console.log(message,level,label,timestamp)
    // var dateFormat= new Date(timestamp);
// var timestamp2 = `${dateFormat.getFullYear()}-
//                   ${dateFormat.getMonth()}-
//                   ${dateFormat.getDate()} 
//                   ${dateFormat.getHours()}:
//                   ${dateFormat.getMinutes()}:
//                   ${dateFormat.getSeconds()}`
return logger.log({
level: level,
message: message,
label: label,
timestamp: `${timestamp} - ${new Date().toISOString()}`
});
}

export default logger