const debug = require('debug')('kavak-task-list:controllers:AuthController');
const User = require('../models/public/User');
const errors = require('../middleware/errors');
module.exports = {
  async findIndex(req, res) {
    let matrix = req.body.matrix;
    let target = req.body.target;
    let result;
    let start = 0;
    let end = matrix.length - 1;
    
    let index = Math.floor((end - start) / 2) + start;
    
    if (target > matrix[matrix.length-1]) {
        index = matrix.length;
    }
    else {
      while (start < end) {
        let value = matrix[index];
        
        if (value === target) {
            result = index;
            break;
        }
        else if (target < value) {
            end = index;
        }
        else {
            start = index + 1;
        }
        index = Math.floor((end - start) / 2) + start;
      }
    }

    return res.json({
      matrix,
      target,
      index
    })
  }
}