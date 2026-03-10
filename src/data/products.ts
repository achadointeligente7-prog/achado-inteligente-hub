import foneImg from "@/assets/products/fone-bluetooth.jpg";
import airFryerImg from "@/assets/products/air-fryer.jpg";
import ledStripImg from "@/assets/products/led-strip.jpg";
import organizadorImg from "@/assets/products/organizador-cozinha.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import miniProjetorImg from "@/assets/products/mini-projetor.jpg";
import ventiladorImg from "@/assets/products/ventilador-usb.jpg";
import suporteImg from "@/assets/products/suporte-celular.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tag?: "viral" | "oferta" | "novo" | "top";
  affiliateUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fone Bluetooth TWS Pro",
    description: "Som cristalino, cancelamento de ruído e 30h de bateria. O melhor custo-benefício.",
    price: "R$ 39,90",
    originalPrice: "R$ 89,90",
    rating: 4.7,
    reviews: 2340,
    image: foneImg,
    category: "tecnologia",
    tag: "viral",
    affiliateUrl: "#",
  },
  {
    id: "2",
    name: "Air Fryer Compacta 3.5L",
    description: "Fritadeira elétrica sem óleo, timer digital e 7 programas automáticos.",
    price: "R$ 189,90",
    originalPrice: "R$ 349,90",
    rating: 4.8,
    reviews: 5621,
    image: airFryerImg,
    category: "cozinha",
    tag: "top",
    affiliateUrl: "#",
  },
  {
    id: "3",
    name: "Fita LED RGB Inteligente 5m",
    description: "Controle por app, 16 milhões de cores, sincroniza com música.",
    price: "R$ 29,90",
    originalPrice: "R$ 59,90",
    rating: 4.5,
    reviews: 1876,
    image: ledStripImg,
    category: "casa",
    tag: "oferta",
    affiliateUrl: "#",
  },
  {
    id: "4",
    name: "Organizador Giratório de Temperos",
    description: "Porta temperos rotativo com 12 potes. Organização prática para sua cozinha.",
    price: "R$ 49,90",
    rating: 4.6,
    reviews: 987,
    image: organizadorImg,
    category: "cozinha",
    tag: "novo",
    affiliateUrl: "#",
  },
  {
    id: "5",
    name: "Smartwatch Fitness Pro",
    description: "Monitor cardíaco, GPS, notificações e +20 modos esportivos. À prova d'água.",
    price: "R$ 89,90",
    originalPrice: "R$ 199,90",
    rating: 4.4,
    reviews: 3210,
    image: smartwatchImg,
    category: "tecnologia",
    tag: "viral",
    affiliateUrl: "#",
  },
  {
    id: "6",
    name: "Mini Projetor Portátil HD",
    description: "Cinema em casa! 1080p, conexão Wi-Fi e Bluetooth. Tela de até 120 polegadas.",
    price: "R$ 249,90",
    originalPrice: "R$ 499,90",
    rating: 4.3,
    reviews: 1543,
    image: miniProjetorImg,
    category: "tecnologia",
    tag: "top",
    affiliateUrl: "#",
  },
  {
    id: "7",
    name: "Mini Ventilador USB de Mesa",
    description: "Silencioso, portátil e potente. Ideal para escritório e home office.",
    price: "R$ 24,90",
    rating: 4.5,
    reviews: 2100,
    image: ventiladorImg,
    category: "casa",
    tag: "oferta",
    affiliateUrl: "#",
  },
  {
    id: "8",
    name: "Suporte Ajustável para Celular",
    description: "Base em alumínio, ajuste de altura e ângulo. Perfeito para videochamadas.",
    price: "R$ 34,90",
    originalPrice: "R$ 69,90",
    rating: 4.6,
    reviews: 1320,
    image: suporteImg,
    category: "tecnologia",
    tag: "novo",
    affiliateUrl: "#",
  },
];

export const categories = [
  { name: "Achados da Shopee", slug: "shopee", icon: "🛍️" },
  { name: "Produtos Virais", slug: "virais", icon: "🔥" },
  { name: "Gadgets Úteis", slug: "gadgets", icon: "⚡" },
  { name: "Barato até R$50", slug: "barato", icon: "💰" },
  { name: "Casa Inteligente", slug: "casa", icon: "🏠" },
  { name: "Cozinha Organizada", slug: "cozinha", icon: "🍳" },
  { name: "Tecnologia Útil", slug: "tecnologia", icon: "💻" },
  { name: "Ofertas do Dia", slug: "ofertas", icon: "⏰" },
];
