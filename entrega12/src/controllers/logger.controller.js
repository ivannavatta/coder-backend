const { Router } = require('express')

const router = Router()

router.get('/', (req, res) =>{
    try {
        req.logger.info('inica el servicio')
        req.logger.warning('vamos para un error');
        req.logger.debug('comienza el debug')
        throw new Error('esto es un error')
        res.json({ message: 'logger Test' })
    } catch (error) {
        req.logger.fatal(' te acaban de hackear ')
        req.logger.error(error.message)
        res.status(500).json({ message: error })
    }
})

module.exports = router