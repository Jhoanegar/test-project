module.exports = {
  filterParams(req, res, next) {
    let order = [[req.query.orderColumn || 'id', req.query.orderDirection || 'ASC']];
    let where;
    if (req.query.filterColumn && req.query.filterValue) {
      where = {
        [req.query.filterColumn]: req.query.filterValue
      };
    }
    
    req.queryParams = {where, order};
    next();
  }
}