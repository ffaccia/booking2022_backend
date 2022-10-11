import express from "express";

export const CreateError = (status, message) => {
    const err = new Error()
    err.errorStatus = status || 500
    err.errorMsg = message || "Custom Server Error"
    err.stack = ""
    return err
}

const mw_errors = (err, req, res, next) => {
    const errorStatus = err.errorStatus || 500
    const errorMsg = err.errorMsg || `Status Error: ${err.errorStatus}. ${err.errorMsg}`
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMsg,
        stack: err.stack
    })
}


export default mw_errors