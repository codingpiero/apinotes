const created_resource = (req) => {
    return {
        created_by_user: req.user.nickname ?? 'unknown',
        created_at_host: req.get('host') ?? 'unknown',
        created_by_ip: req.ip ?? 'unknown',
    }
}

const modified_resourse = (req) => {
    return {
        modified_by_user: req.user.nickname ?? 'unknown',
        modified_at_host: req.get('host') ?? 'unknown',
        modified_by_ip: req.ip ?? 'unknown',
        modified_at : new Date(),
    }
}

export default {
    created_resource,
    modified_resourse,
}