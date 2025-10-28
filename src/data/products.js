import one from "../assets/parfum-1.0.jpg"
import two from "../assets/parfum-2.0.jpg"
import three from "../assets/parfum-3.0.jpg"
import four from "../assets/parfum-4.0.jpg"
import five from "../assets/parfum-5.0.jpg"


export const products = [
  {
    id: 1,
    name: "1.0",
    description: "Чистый и благородный, как горный воздух. С нотами альпийских трав и древесины.",
    price: "12 500 ₽",
    numericPrice: 12500,
    placeholder: one,
    elementId: "product-1",
    inStock: true
  },
  {
    id: 2,
    name: "2.0",
    description: "Теплый и солнечный, с нотами горных цветов и специй. Аромат родины.",
    price: "7 200 ₽",
    numericPrice: 7200,
    placeholder: two,
    elementId: "product-2",
    inStock: true
  },
  {
    id: 3,
    name: "3.0",
    description: "Сильный и независимый. Ноты кожи, дыма и горных трав.",
    price: "13 800 ₽",
    numericPrice: 13800,
    placeholder: three,
    elementId: "product-3",
    inStock: true
  },
  {
    id: 4,
    name: "4.0",
    description: "Глубокое дыхание осени: дымчатый янтарь, Сухие травы и бархатистая кожа.",
    price: "5 000 ₽",
    numericPrice: 5000,
    placeholder: four,
    elementId: "product-4",
    inStock: true
  },
  {
    id: 5,
    name: "5.0",
    description: "Тепло осеннего солнца на коже, И шлейф дыма от костра в прохладе.",
    price: "10 000 ₽",
    numericPrice: 10000,
    placeholder: five,
    elementId: "product-5",
    inStock: true
  }
];

export const features = [
  {
    id: 1,
    icon: "🏔️",
    title: "Горное качество",
    description: "Надежность, проверенная временем, как скалы в горах"
  },
  {
    id: 2,
    icon: "🤝",
    title: "Честность и доверие",
    description: "Мы создаем отношения, которые длятся дольше, чем аромат"
  },
  {
    id: 3,
    icon: " 🎯",
    title: "Индивидуальный подбор",
    description: "Поможем найти аромат, который подчеркнет вашу индивидуальность"
  }
];
