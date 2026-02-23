// data/allProducts.js
import { products } from './products'; // существующие 5 товаров
import parfumOne from '../assets/parfum-1.0.jpg';
import parfumTwo from '../assets/parfum-2.0.jpg';
import parfumThree from '../assets/parfum-3.0.jpg';
import parfumFour from '../assets/parfum-4.0.jpg';
import parfumFive from '../assets/parfum-5.0.jpg';

export const allProducts = [
  ...products, // существующие 5 товаров
  
  // ДОБАВЛЯЕМ НОВЫЕ АРОМАТЫ
  {
    id: 6,
    name: "Горный Рассвет",
    description: "Свежий и бодрящий аромат утренних гор с нотами хвои и цитрусов.",
    price: "8 900 ₽",
    numericPrice: 8900,
    image: parfumOne,
    inStock: true,
  },
  {
    id: 7,
    name: "Альпийский Ветер", 
    description: "Прохладный и чистый, с аккордами мяты и горных трав.",
    price: "9 200 ₽",
    numericPrice: 9200,
    image: parfumTwo,
    inStock: true,
  },
  {
    id: 8,
    name: "Скалистый Утес",
    description: "Мужской и дерзкий аромат с нотами кожи, дыма и дуба.",
    price: "11 000 ₽",
    numericPrice: 11000,
    image: parfumThree,
    inStock: true,
  },
  {
    id: 9,
    name: "Лесная Свежесть",
    description: "Зеленый и натуральный, с нотами мха, папоротника и бергамота.",
    price: "8 500 ₽",
    numericPrice: 8500,
    image: parfumFour,
    inStock: true,
  },
  {
    id: 10,
    name: "Вечерний Туман",
    description: "Таинственный и мягкий, с аккордами лаванды, амбры и мускуса.",
    price: "10 500 ₽",
    numericPrice: 10500,
    image: parfumFive,
    inStock: true,
  }
];
