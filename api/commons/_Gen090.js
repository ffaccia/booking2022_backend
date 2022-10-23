export const isNull = (s) => {
    //return true if null or undefined because null == undefined
    console.log(s)
    console.log(typeof s)
    if (s == null || s === undefined || s === "") return true; 
    return s.toString().trimEnd() == "";
} 
