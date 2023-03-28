import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@ac.sce.ac.il',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'maor',
    email: 'maor@ac.sce.ac.il',
    password: bcrypt.hashSync('12345', 10),
  },
];

export default users;
