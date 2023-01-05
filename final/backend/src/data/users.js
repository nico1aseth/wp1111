import  bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Nicolas',
    email: 'rush.rondo@gmail.com',
    password: bcrypt.hashSync('5487', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('5487', 10),
    isAdmin: true,
  },
  {
    name: 'Test',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('5487', 10),
  },
  {
    name: 'Wizz',
    email: 'wizz@gmail.com',
    password: bcrypt.hashSync('5487', 10),
    isAdmin: true,
  },
]

export default users;