import { menuArray as menuItems } from './data.js'

let orderedItems = []
const renderMenuItems = () => {
  let feed = ''

  menuItems.forEach(item => {
    feed += /*html*/ `
      <div class="item">
        <div class="emoji">${item.emoji}</div>
        <div class="description">
          <h3 class="name">${item.name}</h3>
          <p class="ingredients">${item.ingredients.join(', ')}</p>
          <p class="price">$${item.price}</p>
        </div>
        <button class="add-button" data-name="${item.name}">+</button>
      </div>
    `
    document.querySelector('.container').innerHTML = feed
  })
}

const renderCheckout = (arr) => {
  let total = 0
  document.querySelector('tbody').innerHTML = arr.map(item => {
    total += item[0].price
    return /*html*/ `<tr>
      <th>${item[0].name} <button>Remove</button></th>
      <td>$${item[0].price}</td>
    </tr>`
  }).join('')

  document.querySelector('tfoot td').textContent = '$' + total
}

renderMenuItems()

document.querySelector('main').addEventListener('click', e => {
  if(e.target.textContent === '+') {
    orderedItems.push(menuItems.filter(item => item.name === e.target.dataset.name))

    renderCheckout(orderedItems)
    document.querySelector('footer').style.display = 'block' 
  }
})