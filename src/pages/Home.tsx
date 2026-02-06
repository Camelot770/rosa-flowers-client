import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flower2,
  Truck,
  Clock,
  ChevronRight,
  Sparkles,
  Phone,
  MapPin,
  Star,
  Palette,
} from 'lucide-react';
import api from '../api/client';

import { imageUrl } from '../utils/image';

interface Bouquet {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  images: { url: string }[];
  isHit: boolean;
  isNew: boolean;
  category: string;
}

const categories = [
  { label: 'Розы', value: 'roses', emoji: '🌹' },
  { label: 'Тюльпаны', value: 'tulips', emoji: '🌷' },
  { label: 'Авторские', value: 'author', emoji: '🎨' },
  { label: 'Пионы', value: 'peonies', emoji: '🌸' },
  { label: 'Экзотика', value: 'exotic', emoji: '🌺' },
  { label: 'Все букеты', value: 'all', emoji: '💐' },
];

export default function Home() {
  const navigate = useNavigate();
  const [hits, setHits] = useState<Bouquet[]>([]);
  const [newArrivals, setNewArrivals] = useState<Bouquet[]>([]);
  const [loadingHits, setLoadingHits] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);

  useEffect(() => {
    api
      .get('/bouquets', { params: { isHit: true } })
      .then((res) => setHits(res.data))
      .catch(() => {})
      .finally(() => setLoadingHits(false));

    api
      .get('/bouquets', { params: { isNew: true } })
      .then((res) => setNewArrivals(res.data))
      .catch(() => {})
      .finally(() => setLoadingNew(false));
  }, []);

  const formatPrice = (price: number) =>
    price.toLocaleString('ru-RU') + ' \u20BD';

  const renderBouquetCard = (bouquet: Bouquet) => (
    <button
      key={bouquet.id}
      onClick={() => navigate(`/bouquet/${bouquet.id}`)}
      className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-sm overflow-hidden text-left"
    >
      <div className="relative w-full h-44 bg-gray-100">
        {bouquet.images?.[0]?.url ? (
          <img
            src={imageUrl(bouquet.images[0].url)}
            alt={bouquet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Flower2 size={40} className="text-gray-300" />
          </div>
        )}
        {bouquet.isHit && (
          <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ХИТ
          </span>
        )}
        {bouquet.isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {bouquet.name}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-primary-dark">
            {formatPrice(bouquet.price)}
          </span>
          {bouquet.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(bouquet.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </button>
  );

  const renderSkeletonCards = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
      >
        <div className="w-full h-44 bg-gray-200" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    ));

  return (
    <div className="pb-4">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-pink-400 via-primary to-pink-300 text-white px-5 pt-10 pb-8 rounded-b-[2rem] shadow-lg">
        <div className="absolute top-4 right-4 opacity-20">
          <Flower2 size={80} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Роза цветов</h1>
        <p className="text-pink-100 text-sm mt-1 font-medium">
          Студия флористики
        </p>
        <p className="text-white/80 text-xs mt-3 leading-relaxed max-w-[260px]">
          Свежие букеты с доставкой по городу. Собираем с любовью, доставляем с
          заботой.
        </p>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Truck size={14} />
            <span className="text-xs font-medium">Доставка 1-2 ч</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Clock size={14} />
            <span className="text-xs font-medium">09:00 - 21:00</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Каталог</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                navigate(
                  cat.value === 'all'
                    ? '/catalog'
                    : `/catalog?category=${cat.value}`
                )
              }
              className="flex flex-col items-center justify-center bg-white rounded-2xl py-3.5 px-2 shadow-sm active:scale-95 transition-transform"
            >
              <span className="text-2xl mb-1">{cat.emoji}</span>
              <span className="text-xs font-medium text-gray-700">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Hits Section */}
      <div className="mt-7">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-primary-dark" />
            <h2 className="text-lg font-bold text-gray-800">Хиты продаж</h2>
          </div>
          <button
            onClick={() => navigate('/catalog?isHit=true')}
            className="flex items-center gap-0.5 text-sm text-primary-dark font-medium"
          >
            Все <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {loadingHits
            ? renderSkeletonCards()
            : hits.length > 0
              ? hits.map(renderBouquetCard)
              : (
                <p className="text-sm text-gray-400 py-8">
                  Скоро здесь появятся хиты
                </p>
              )}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="mt-7">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-green-500" />
            <h2 className="text-lg font-bold text-gray-800">Новинки</h2>
          </div>
          <button
            onClick={() => navigate('/catalog?isNew=true')}
            className="flex items-center gap-0.5 text-sm text-primary-dark font-medium"
          >
            Все <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {loadingNew
            ? renderSkeletonCards()
            : newArrivals.length > 0
              ? newArrivals.map(renderBouquetCard)
              : (
                <p className="text-sm text-gray-400 py-8">
                  Скоро здесь появятся новинки
                </p>
              )}
        </div>
      </div>

      {/* Constructor CTA Banner */}
      <div className="px-4 mt-7">
        <button
          onClick={() => navigate('/constructor')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-5 text-left shadow-md active:scale-[0.98] transition-transform relative overflow-hidden"
        >
          <div className="absolute top-3 right-3 opacity-20">
            <Palette size={60} />
          </div>
          <h3 className="text-lg font-bold">Собери свой букет</h3>
          <p className="text-white/80 text-sm mt-1 max-w-[240px]">
            Выберите цветы, упаковку и декор — создайте уникальную композицию
          </p>
          <div className="mt-3 inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
            Конструктор букетов <ChevronRight size={16} />
          </div>
        </button>
      </div>

      {/* About / Contact Info */}
      <div className="px-4 mt-7 mb-2">
        <h2 className="text-lg font-bold text-gray-800 mb-3">О нас</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5">
          <a
            href="tel:+79178765958"
            className="flex items-center gap-3 text-gray-700"
          >
            <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
              <Phone size={16} className="text-primary-dark" />
            </div>
            <div>
              <p className="text-sm font-medium">+7 917 876-59-58</p>
              <p className="text-xs text-gray-400">Звоните и заказывайте</p>
            </div>
          </a>

          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-primary-dark" />
            </div>
            <div>
              <p className="text-sm font-medium">д. Званка, ул. Приозёрная, д. 58</p>
              <p className="text-xs text-gray-400">Казань</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-primary-dark" />
            </div>
            <div>
              <p className="text-sm font-medium">Ежедневно 09:00 - 21:00</p>
              <p className="text-xs text-gray-400">Без выходных</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
