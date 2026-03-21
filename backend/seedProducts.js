// backend/seedProducts.js
const { connectdatabase } = require('./connectiondb');
const Product = require('./models/product');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce';

const products = [
  {
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    price: 25.99,
    image: 'uploads/productphoto/mouse.jpg',
    stock: 100,
    category: 'Electronics',
    isFeatured: true
  },
  {
    title: 'Bluetooth Headphones',
    description: 'Noise-cancelling over-ear headphones',
    price: 79.99,
    image: 'uploads/productphoto/headphones.jpg',
    stock: 50,
    category: 'Electronics',
    isFeatured: false
  },
  {
    title: 'Yoga Mat',
    description: 'Non-slip yoga mat for all exercises',
    price: 19.99,
    image: 'uploads/productphoto/yogamat.jpg',
    stock: 200,
    category: 'Fitness',
    isFeatured: false
  },
  {
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold for 24h',
    price: 15.49,
    image: 'https://www.google.com/imgres?q=bottl&imgurl=https%3A%2F%2Fegcplc.com%2Fcdn%2Fshop%2Ffiles%2FIMG_9772copy.jpg%3Fv%3D1714392239%26width%3D1946&imgrefurl=https%3A%2F%2Fegcplc.com%2Fproducts%2Fleben-tree-wave-stainless-steel-single-wall-water-bottle-1000-ml-bottle&docid=hbbDGvVoTZP_VM&tbnid=-Px_snzHhnt88M&vet=12ahUKEwi9x5HYp6uTAxW08qACHWoICcQQnPAOegQIGhAB..i&w=1946&h=2335&hcb=2&ved=2ahUKEwi9x5HYp6uTAxW08qACHWoICcQQnPAOegQIGhAB',
    stock: 150,
    category: 'Fitness',
    isFeatured: true
  }
];

async function seed() {
  await connectdatabase(MONGO_URL);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded with products!');
  process.exit();
}

seed();
