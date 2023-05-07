module.export = function (handle) {
    return async (req, res, next) => {
        try {
            await handle(req, res)
        } catch (ex) {
            res.status(400).send({ message: ex.message })
        }

    }
}