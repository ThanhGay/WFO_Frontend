import BackHeader from '../components/header/BackHeader';
import Chicken from '../img/Heading Image.png';
import Star from '../img/Star 1.png';
import Delivery from '../img/Delivery.png';
import Clock from '../img/Clock.png';
import { useState } from 'react';
function Cart() {
  const [size, setSize] = useState<'10' | '14' | '16'>('10');
  const [quantity, setQuantity] = useState(1);
  const sizePrices: { '10': number; '14': number; '16': number } = {
    '10': 25,
    '14': 32,
    '16': 40
  };
  const totalPrice = sizePrices[size] * quantity;

  return (
    <div className="py-3 px-1">
      <BackHeader title="Details"></BackHeader>
      <img className="w-full rounded-lg object-cover" src={Chicken} />
      <div className="py-3 px-3">
        <p className="font-medium">Chicken & chip</p>
        <p className="text-xs text-gray-500">
          Prosciutto e funghi is a pizza variety that is topped with tomato
          sauce.
        </p>
      </div>
      <div className="flex flex-row justify-start gap-9 py-2 px-2">
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Star} />
          <p className="font-semibold text-xs">4.7</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Delivery} />
          <p className="font-semibold text-xs">Free</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img className="size-4" src={Clock} />
          <p className="font-semibold text-xs">20 min</p>
        </div>
      </div>

      
      <div className="mt-4 flex items-center gap-2">
        <span className="font-semibold text-xs">SIZE:</span>
        <div className="flex space-x-2 mt-2">
          {['10', '14', '16'].map((s) => (
            <button
              key={s}
              className={`px-4 py-2 rounded-full ${
                size === s
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => setSize(s as '10' | '14' | '16')}
            >
              {s}"
            </button>
          ))}
        </div>
      </div>

    
      <div className="flex items-center justify-between mt-4 bg-gray-100 p-2 rounded-lg">
        <span className="font-semibold text-xl">${totalPrice}</span>
        <div className="flex items-center rounded-full bg-black p-2 ">
          <button
            className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span className="mx-4 text-white">{quantity}</span>
          <button
            className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button className="w-full bg-orange-500 text-white font-medium py-3 mt-4 rounded-lg">
        ADD TO CART
      </button>
    </div>
  );
}

export default Cart;
