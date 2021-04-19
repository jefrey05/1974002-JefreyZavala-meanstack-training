/* globals fetch */
var update = document.getElementById('update')


update.addEventListener('click', function () {
  var id = document.getElementById('id').value;
  var amount = document.getElementById('amount').value;
  console.log(id);
  console.log(amount);
  if(isNaN(id)){
    return null;
  }
  if(isNaN(amount)){
    return null;
  }
  fetch('update', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'id': id,
      'amount': amount
    })
  })
  .then(response => {
    if (response.ok) return response.json()
    window.location="/fetch"

  })
  .then(data => {
    console.log(data)
    window.location="/fetch"

  })
})

// del.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'delete',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name': 'Darth Vader'
//     })
//   }).then(function (response) {
//     window.location.reload()
//   })
// })
