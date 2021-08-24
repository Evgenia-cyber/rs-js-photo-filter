const inputs = document.querySelectorAll('.filter');
const presets = document.querySelectorAll('.presets-img');
const initFilters = {
  blur: [0, 'px'],
  brightness: [100, '%'],
  contrast: [100, '%'],
  grayscale: [0, '%'],
  'hue-rotate': [0, 'deg'],
  invert: [0, '%'],
  opacity: [100, '%'],
  saturate: [100, '%'],
  sepia: [0, '%'],
};

function handleChange(event) {
  const value = this.value;

  const filterValueEl = event.target.parentNode.lastElementChild;
  filterValueEl.textContent = value;

  const size = this.dataset.size || '';

  document.documentElement.style.setProperty(`--${this.id}`, value + size);
}

function handleOnPresetClick() {
  resetFilters();

  const { filter } = window.getComputedStyle(this); // 'brightness(0.81) saturate(1.9)'

  filter.split(' ').forEach((item) => {
    const arr = item.split('(');

    const filterName = arr[0];

    const filterValue =
      filterName === ('blur' && 'hue-rotate')
        ? parseFloat(arr[1])
        : Math.round(parseFloat(arr[1]) * 100);

    setFiltersValue(filterName, filterValue);
  });
}

function resetFilters() {
  Object.keys(initFilters).forEach((filter) => {
    const filterValue = initFilters[filter][0];

    setFiltersValue(filter, filterValue);
  });
}

function setFiltersValue(filterName, filterValue) {
  const filterSize = initFilters[filterName][1];

  const inputEl = document.querySelector(`#${filterName}`);
  inputEl.value = filterValue;

  const filterValueEl = document.querySelector(`.filter-value-${filterName}`);
  filterValueEl.textContent = filterValue;

  document.documentElement.style.setProperty(
    `--${filterName}`,
    filterValue + filterSize,
  );
}

inputs.forEach((input) => input.addEventListener('change', handleChange));

presets.forEach((preset) =>
  preset.addEventListener('click', handleOnPresetClick),
);
