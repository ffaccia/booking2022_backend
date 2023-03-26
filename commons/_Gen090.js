import { dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export const isNull = (s) => {
  //return true if null or undefined because null == undefined
  if (s == null) return true;
  return s.trimEnd() == "";
};

export const calcFromStr = (s) => Function(`return(${s})`)();

export const strToArray = (s) => {
  console.log("s vale ",s)
  if (isNull(s)) 
    return s;

  if (typeof s === 'number')
     s.toString()

  if (typeof s === 'string') 
     return [...s.split(",")];
  else if (Array.isArray(s)) 
     return s 
  
  throw new Error(`Parameter ${s} not recognized!`) 
}



export const __dirname = (path) => dirname(path);
export const __filename = (path) => basename(path);


/* check what an object is */
var stringConstructor = "test".constructor;
var arrayConstructor = [].constructor;
var objectConstructor = ({}).constructor;
function whatIsIt(object) {
  if (object === null) {
      return "null";
  }
  if (object === undefined) {
      return "undefined";
  }
  if (object.constructor === stringConstructor) {
      return "String";
  }
  if (object.constructor === arrayConstructor) {
      return "Array";
  }
  if (object.constructor === objectConstructor) {
      return "Object";
  }
  {
      return "don't know";
  }
}

/*
var testSubjects = ["string", [1,2,3], {foo: "bar"}, 4];

for (var i=0, len = testSubjects.length; i < len; i++) {
  alert(whatIsIt(testSubjects[i]));
}
*/