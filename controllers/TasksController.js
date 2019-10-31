const debug = require('debug')('kavak-task-list:controllers:TasksController');
const Task = require('../models/public/Task');
const errors = require('../middleware/errors');
const _ = require('lodash');

module.exports = {
  async index(req, res, next) {
    let where = _.extend({idUser: req.user.id}, req.queryParams.where)
    let order = req.queryParams.order;
    
    let params = {where, order};

    debug("Params: ", params);
    try {
      let tasks = await Task.findAll({where, order});
      return res.json({
        tasks
      })
    } catch (err) {
      return errors.serverError(req, res, err);
    }
  },
  async find(req, res, next) {
    try {
      let task = await Task.findOne({
        where: {
          idUser: req.user.id,
          id: req.params.idTask
        }
      });
      if (task) {
        return res.json({
          task
        })
      }
      return res.status(404).json({
        message: "Task not found"
      })
      
    } catch (err) {
      return errors.serverError(req, res, err);
    }
  },
  async create(req, res, next) {
    try {
      let task = await Task.create({
        name: req.body.name,
        expiresAt: req.body.expiresAt,
        order: req.body.order,
        idUser: req.user.id
      });

      return res.json({task})
    } catch (err) {
      return errors.serverError(req, res, err);
    }
  },
  async update(req, res, next) {
    try {
      let [result] = await Task.update({
        name: req.body.name,
        expiresAt: req.body.expiresAt,
        order: req.body.order,
      }, {
        where: {
          idUser: req.user.id,
          id: req.params.idTask
        }
      });

      if (result) {
         let task = await Task.findOne({
          where: {
            id: req.params.idTask
          }
        });
        return res.json({task})
      } else {
        return res.status(404).json({
          message: "Task not found"
        })
      }

    } catch (err) {
      return errors.serverError(req, res, err);
    }
  },
  async delete(req, res, next) {
    try {
      let result = await Task.destroy({
        where: {
          idUser: req.user.id,
          id: req.params.idTask
        }
      });

      if (result) {
        return res.status(204).send();
      } else {
        return res.status(404).json({
          message: "Task not found"
        })
      }

    } catch (err) {
      return errors.serverError(req, res, err);
    }
  }
}