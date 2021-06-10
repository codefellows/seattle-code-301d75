let form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitted');
});

let header = document.getElementById('nameHeader');

let nameInput = document.querySelector('input[name="name"]');

console.log(nameInput);

nameInput.addEventListener('input', e => {
  header.textContent = `Welcome, ${e.target.value}`;
});
