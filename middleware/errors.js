module.exports = {
  serverError(req, res, err) {
    console.error(err);
    return res.status(500).json({
      err: err ? err.stack : "Server erroro"
    })
  },
  authError(req, res) {
    return res.status(403).json({
      err: 'Invalid token'
    })
  }
}