const bcryptjs = require('bcryptjs');

const users = [
  {
    name: 'Admin',
    email: 'admin@ac.sce.ac.il',
    role: 'WarehouseManager',
    password: bcryptjs.hashSync('123456', 12),
    isAdmin: true,
  },
];

exports.users = users;
