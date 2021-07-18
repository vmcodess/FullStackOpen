const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, current) => accumulator + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikedBlog = blogs.reduce((prevBlog, currentBlog) => prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog);
  mostLikedBlog = (({ title, author, likes }) => ({ title, author, likes }))(mostLikedBlog);
  console.log(mostLikedBlog);
  return mostLikedBlog.likes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};