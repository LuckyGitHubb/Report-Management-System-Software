const successResponse = (res, data, message="Success", status=200) => {
    return res.status(status).json({success: true, message, data}); 
}

const errorResponse = (res, error, status=500) => {
    console.log(error); 
    return res.status(status).json({success: false, message: error.message || "Internal Server Error." });
}

const earlyReturnRespone = (res, message, status) => {
    return res.status(status).json({success: false, message}); 
}

export {
    successResponse, 
    errorResponse,
    earlyReturnRespone
}