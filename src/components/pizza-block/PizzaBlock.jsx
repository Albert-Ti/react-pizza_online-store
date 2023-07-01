import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { additem } from '../redux/slices/cartSlice'
import { selectPizzaItemsById } from '../redux/slices/fetchPizzas'
import { Link } from 'react-router-dom'
const typePizza = ['тонкое', 'традиционная']

function PizzaBlock({ name, imageUrl, price, sizes, types, id }) {
  const [activeSize, setActiveSize] = React.useState(0)
  const [activeType, setActiveType] = React.useState(0)
  const dispatch = useDispatch()
  const countPizza = useSelector(selectPizzaItemsById(id))
  const checkCount = countPizza ? countPizza.count : 0

  const addPizzas = () => {
    const newPizzas = {
      id,
      imageUrl,
      name,
      price,
      types: typePizza[activeType],
      sizes: sizes[activeSize]
    }
    dispatch(additem(newPizzas))
  }

  return (
    <div className='pizza-block'>
      <Link to={`/pizza/${id}`}>
        <img className='pizza-block__image' src={imageUrl} alt={name} />
        <h4 className='pizza-block__title'>{name}</h4>
      </Link>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((t, i) => (
            <li onClick={() => setActiveType(i)} className={activeType === i ? 'active' : ''} key={i}>
              {typePizza[t]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''} key={i}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>

        <button className='button button--outline button--add'>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span onClick={addPizzas}>Добавить</span>
          {checkCount > 0 && <i>{checkCount}</i>}
        </button>
      </div>
    </div>
  )
}
export default PizzaBlock
