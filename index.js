import { menuArray as menuItems } from './data.js'

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
        <button class="add-button" data-id="${item.id}">+</button>
      </div>
    `
    document.querySelector('.container').innerHTML = feed
  })
}

const renderCheckout = (arr) => {
  let total = 0
  document.querySelector('tbody').innerHTML = arr.map(item => {
    total += item.price * item.units
    return /*html*/ `<tr>
      <th class="units">${item.units}</th>
      <th class="name">${item.name} <button class="remove-btn" data-id="${item.id}">Remove</button>
      </th>
      <td class="ordered-price">$${item.price * item.units}</td>
    </tr>`
  }).join('')

  document.querySelector('tfoot td').textContent = '$' + total
}

renderMenuItems()

document.addEventListener('click', e => {
  if(e.target.textContent === '+') {
    menuItems.filter(item => item.id === Number(e.target.dataset.id))[0].units += 1
    renderCheckout(menuItems.filter(item => item.units))
    document.querySelector('footer').style.display = 'block'
  } else if(e.target.classList.contains('remove-btn')) {
    menuItems.filter(item => item.id === Number(e.target.dataset.id))[0].units -= 1
    renderCheckout(menuItems.filter(item => item.units))
    document.querySelector('footer').style.display = menuItems.filter(item => item.units).length === 0 ? 'none' : 'block'
  } else if(e.target.id === 'complete-btn') {
    document.getElementById('modal').style.display = 'block'
  }
})

document.getElementById('modal').addEventListener('submit', e => {
  e.preventDefault()

  e.target.style.display = 'none'
  document.getElementById('message').style.display = 'block'
  menuItems.forEach(item => item.units = 0)
  document.querySelector('footer').style.display = 'none'

  setTimeout(() => document.getElementById('rating-modal').style.display = 'block', 3000)
})

document.querySelectorAll('i').forEach(icon => {
  icon.addEventListener('click', e => {
    document.querySelectorAll('i').forEach(icon => icon.style.color = '#c4c4c4')
    for(let i = Number(e.target.id); i >= 0; i--) {
      document.getElementById(i).style.color = '#ffdd00'
    }
  })
})