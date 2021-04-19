/* globals fetch */
var del = document.getElementById('delete')


del.addEventListener('click', function () {
  var id = document.getElementById('id').value;

  fetch('delete', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': id
    })
  }).then(function (response) {
    window.location="/fetch"
  })
})
