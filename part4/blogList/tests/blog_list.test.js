const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let obj = new Blog(blog);
    await obj.save();
  }
});

test('all blogs returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('query if a blog has id or _id', async () => {
  const singleBlog = await helper.blogsInDb();

  expect(singleBlog[0].id).toBeDefined();
  expect(singleBlog[0]._id).toBe(undefined);
});

test('a new blog is added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'vmcodes',
    url: 'http://blog.com/newBlog/',
    likes: 49,
  };

  await api.post('/api/blogs').send(newBlog).expect(201);
  const response = await api.get('/api/blogs').expect(200);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

// not working.. skipping
test('verify if likes property is missing then it defaults to 0', async () => {
  const newBlog = {
    title: 'Verifying',
    author: 'Jane Doe',
    url: 'https://fullstackopen.com/'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  //const response = await api.get('/api/blogs').expect(200);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test('delete a blog', async () => {
  const deleteblog = {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  };

  await api.delete(`/api/blogs/${deleteblog._id}`).expect(204);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd.length).toBe(initialBlogs.length - 1);
});

afterAll(() => {
  mongoose.connection.close();
});