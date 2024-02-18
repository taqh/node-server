import path from "path";

const fs = require('fs');

const filepath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'data.json'
);

// create a path to the data.json file in my src folder  and then use the fs module to read the file

const data = fs.readFileSync(filepath, 'utf8');

exports.getArticles = (req, res, next) => {
   // send a response with the data from the file
   res.status(200).json({
      message: 'Get all articles',
      data: JSON.parse(data),
   });
};

exports.createArticle = (req, res, next) => {
  res.status(201).json({
    message: 'Create new article',
    data: req.body,
  });
};

exports.updateArticle = (req, res, next) => {
  res.status(200).json({
    message: 'Update article',
    data: req.body,
  });
};

exports.deleteArticle = (req, res, next) => {
  res.status(200).json({
    message: 'Delete article',
    data: req.body,
  });
};
