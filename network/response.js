const success = (req,res,httpcode,message,info,result) => {
    res.status(httpcode).json({
        success:true,
        sist:'appnote',
        message:message,
        info,
        result,
    });
}

const error = (req,res,httpcode,message) => {
    res.status(httpcode).json({
        success:false,
        sist:'appnote',
        message:''
    });
}

export default {
    success,
    error,
};