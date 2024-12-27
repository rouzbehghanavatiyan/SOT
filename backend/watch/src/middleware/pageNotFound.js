const pageNotFound = (req, res) => res.status(500).json({ msg: "page not found" })

module.exports = pageNotFound;