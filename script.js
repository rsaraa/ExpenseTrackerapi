// DOM elements
const addEntry = document.getElementById('add-entry')
const category = document.getElementById('category')
const amount = document.getElementById('amount')
const date = document.getElementById('date')

addEntry.addEventListener('click', async function () {
    const respObj = await fetch('/add-entry', {
        method: 'POST',
        body: JSON.stringify({
            "category": category.value,
            "amount": amount.value,
            "date": date.value
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const data = await respObj.json()
})