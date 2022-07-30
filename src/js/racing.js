import { isValidNumberOfCharacters } from './validation/index.js';
import {
  appendRacingEl,
  prepareRacingArea,
  removeLoadingEl,
  setDisabledForm,
  showContent,
} from './view/index.js';
import { $formTryCount, $racingCar } from './selector.js';
import { getRandomIntInclusive, getIsForward } from './util/index.js';

const cars = [];

const createCars = (carNameList) => {
  const newCars = carNameList.map((carName) => ({
    name: carName,
    step: 0,
  }));
  cars.push(...newCars);
};

const updateCarStep = (car, isForward) => {
  if (isForward) {
    car.step += 1;
  }
};

export const handleWriteCarName = (event) => {
  event.preventDefault();

  const carNameValue = new FormData(event.target).get('car-name');
  const carNameValueList = carNameValue.split(',').map((text) => text.trim());
  if (!isValidNumberOfCharacters(carNameValueList)) {
    alert(
      '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
    );
    return;
  }

  setDisabledForm(event.target);
  createCars(carNameValueList);
  showContent($formTryCount);
  prepareRacingArea(carNameValueList);
};

export const handleWriteTryCount = (event) => {
  event.preventDefault();

  const tryCount = new FormData(event.target).get('try-count');
  setDisabledForm(event.target);

  [...Array(tryCount)].forEach(() => {
    const resultOfOneCycle = cars.map(() =>
      getIsForward(getRandomIntInclusive(0, 9))
    );

    cars.forEach((car, i) => updateCarStep(car, resultOfOneCycle[i]));

    appendRacingEl(resultOfOneCycle);
  });

  removeLoadingEl();
  showContent($racingCar);
};
