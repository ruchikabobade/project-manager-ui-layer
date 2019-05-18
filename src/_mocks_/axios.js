'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      users: [
        {
          id: 0,
          firstName: 'Wash the dishes',
          lastName: 'Wash the dishes',
          employeeId: '001'
        },
        {
          id: 1,
          name: 'Make the bed',
          lastName: 'Wash the dishes',
          employeeId: '002'
        }
      ]
    });
  }
};