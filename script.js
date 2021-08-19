const inputs = document.querySelectorAll('.filter');

function handleChange(event) {
  const value = this.value;

  const filterValueEl = event.target.parentNode.lastElementChild;
  filterValueEl.textContent = value;

  const size = this.dataset.size || '';

  document.documentElement.style.setProperty(`--${this.id}`, value + size);
}

inputs.forEach((input) => input.addEventListener('change', handleChange));
