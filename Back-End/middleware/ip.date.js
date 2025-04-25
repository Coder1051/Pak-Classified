function time(req, res, next) {
    console.log(Date());
    next()
}

function ip(req, res) {
    console.log(req.ip);
    console.log(req.hostname);
}
module.exports = {
    time, ip
}