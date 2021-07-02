const Tipo = require('../models/Tipo_aeronave')

module.exports = {
    async consulta(req, res) {
        const tipo = await Tipo.findAll()

        return res.json(tipo)
    },

    async create(req, res) {
        const { nome_tipo_aeronave, qtd_max_assento, companhia } = req.body

        const alreadyExist = await Tipo.findByPk(nome_tipo_aeronave)
        if (alreadyExist) {
            return res.status(409).send({ message: 'Este tipo de aeronave já existe' })
        }
        const tipo = await Tipo.create({ nome_tipo_aeronave, qtd_max_assento, companhia })

        return res.json(tipo)
    },
    async atualizar(req, res) {
        const { codigo } = req.params
        const { nome_tipo_aeronave, qtd_max_assento, companhia } = req.body

        const tipo = await Tipo.update({ nome_tipo_aeronave, qtd_max_assento, companhia }, { where: { nome_tipo_aeronave: codigo } })

        return res.json(tipo)
    }
}