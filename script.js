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

const initAll = {
  ...initFilters,
  size: [1, ''],
  'bg-color': ['#1a1920', ''],
};

const resetAllBtn = document.querySelector('.reset-all-btn');
const resetFiltersBtn = document.querySelector('.reset-filters-btn');

const imgEl = document.querySelector('.img');
const inputLoadFileEl = document.querySelector('.load-file-input');

const saveBtn = document.querySelector('.save-btn');

function handleChange(event) {
  const value = this.value;

  const filterValueEl = event.target.parentNode.lastElementChild;
  filterValueEl.textContent = value;

  const size = this.dataset.size || '';

  document.documentElement.style.setProperty(`--${this.id}`, value + size);
}

function handleOnPresetClick() {
  resetData(initFilters);

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

function resetData(initData) {
  Object.keys(initData).forEach((item) => {
    const itemValue = initData[item][0];

    setFiltersValue(item, itemValue);
  });
}

function setFiltersValue(filterName, filterValue) {
  const filterSize = initAll[filterName][1];

  const inputEl = document.querySelector(`#${filterName}`);
  inputEl.value = filterValue;

  const filterValueEl = document.querySelector(`.filter-value-${filterName}`);
  filterValueEl.textContent = filterValue;

  document.documentElement.style.setProperty(
    `--${filterName}`,
    filterValue + filterSize,
  );
}

function handleOnResetAllBtnClick() {
  resetData(initAll);
}

function handleOnResetFiltersBtnClick() {
  resetData(initFilters);
}

function handleOnLoadImg() {
  const imgFile = this.files[0];
  imgEl.alt = 'photo for filter';
  const reader = new FileReader();
  reader.onload = (function (aImg) {
    return function (event) {
      aImg.src = event.target.result;
    };
  })(imgEl);
  reader.readAsDataURL(imgFile);
}

function handleOnSaveBtnClick() {
  const canvas = document.createElement('canvas');
  canvas.width = imgEl.clientWidth;
  canvas.height = imgEl.clientHeight;
  const ctx = canvas.getContext('2d');
  const { filter } = window.getComputedStyle(imgEl);
  ctx.filter = filter; // 'blur(0px) brightness(1) contrast(1) grayscale(0) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)';
  ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  const url = canvas.toDataURL('image/jpg');
  const linkToSave = document.querySelector('.save-file');
  linkToSave.download = 'image.jpg';
  linkToSave.href = url;
  canvas.delete;
}

inputs.forEach((input) => input.addEventListener('change', handleChange));

presets.forEach((preset) =>
  preset.addEventListener('click', handleOnPresetClick),
);

resetAllBtn.addEventListener('click', handleOnResetAllBtnClick);

resetFiltersBtn.addEventListener('click', handleOnResetFiltersBtnClick);

inputLoadFileEl.addEventListener('change', handleOnLoadImg);

saveBtn.addEventListener('click', handleOnSaveBtnClick);
