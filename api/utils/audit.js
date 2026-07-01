const created = function(request){
    return {
        created_by_user: request?.user?.nickname ?? 'unknown',
        created_at: new Date(),
        created_at_host: request.get('host') ?? 'unknown',
        created_by_ip: request.ip ??'unknown'
    }
};

const modified = function (request) {
    return {
        modified_by_user: request?.user?.nickname ?? 'unknown',
        modidied_at: new Date(),
        modified_at_host:request.get('host') ?? 'unknown',
        modified_by_ip: request.ip ?? 'unknown'
    }
};


export default {
    created,
    modified,
}