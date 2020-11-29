const db = require('../models');

const { tutorials: Tutorial } = db;
const { Op } = db.Sequelize;

exports.create = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });

    return;
  }

  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  try {
    const data = await Tutorial.create(tutorial);

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial'
    });
  }
};

exports.findAll = async (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  try {
    const data = await Tutorial.findAll({ where: condition });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Tutorial.findByPk(id);

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving Tutorial with id=${id}`
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const [affRows] = await Tutorial.update(req.body, { where: { uuid: id } });

    switch (affRows) {
      case 1:
        res.send({
          message: 'Tutorial was updated successfully'
        });
        break;

      default:
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
        break;
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating Tutorial with id=${id}`
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const affRows = await Tutorial.destroy({ where: { uuid: id } });

    switch (affRows) {
      case 1:
        res.send({
          message: 'Tutorial was deleted successfully'
        });
        break;

      default:
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
        break;
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete Tutorial with id=${id}`
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Tutorial.destroy({
      where: {},
      truncate: false
    });

    res.send({ message: `${nums} Tutorials were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while removing all tutorials.'
    });
  }
};

exports.findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.findAll({ where: { published: true } });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving tutorials'
    });
  }
};
