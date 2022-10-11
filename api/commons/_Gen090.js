export const isNull = (s) => {
    //return true if null or undefined because null == undefined
    if (s == null) return true; 
    return s.trimEnd() == "";
} 
