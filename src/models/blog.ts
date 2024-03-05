import mongoose from 'mongoose';

interface Article {
  coverImage: string;
  title: string;
  date: string;
  content: string;
  author: string;
}

const articleSchema = new mongoose.Schema(
  {
    coverImage: {
      type: 'string',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
