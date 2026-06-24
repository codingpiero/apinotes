const success = (req,res,status,message,data) => {
    let apiStatus = status ?? 200;
    let apiMessage = message ?? 'Operacion realizada correctamente';
    res.status(apiStatus).json( {
        success:true,
        status:apiStatus,
        sist:'app notes',
        message:apiMessage,
        data
    });
}
const error = (req,res,status,message) => {
    let apiStatus = status ?? 500;
    let apiMessage = message ?? '[GNR::0001]ERROR INTERNAL';
    res.status(apiStatus).json({
        success:false,
        status:apiStatus,
        sist:'app notes',
        message:apiMessage
    });
}

export default {
    success,
    error,
}