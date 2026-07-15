const created_resource = (req) => {
    return {
        created_by_user: req.user.nickname ?? 'unknown',
        created_at_host: req.get('host') ?? 'unknown',
        created_by_ip: req.ip ?? 'unknown',
    }
}

export default {
    created_resource,
}