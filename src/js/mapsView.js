import icons from "url:../images/icons.svg";
import detailsView from "./detailsView";

class MapView {
  _parentElement = document.querySelector(".maps-view__container");
  _regionElement = document.querySelector("#region");
  _searchElement = document.querySelector("#input");
  _darkModeBtn = document.querySelector(".header__theme-switch");
  _root = document.querySelector(":root");
  _switch = true;

  numebrFormat(number) {
    const formated = new Intl.NumberFormat().format(number);
    return formated;
  }

  darkmode() {
    console.log(this._root);
    this._darkModeBtn.addEventListener(
      "click",
      function () {
        if (this._switch) {
          this._root.style.setProperty("--color-bg", "hsl(207, 26%, 17%)");
          this._root.style.setProperty("--color-input", "hsl(209, 23%, 22%)");
          this._root.style.setProperty("--color-text", "hsl(0, 0%, 100%)");
        } else {
          this._root.style.setProperty("--color-bg", "hsl(0, 0%, 98%)");
          this._root.style.setProperty("--color-input", "hsl(0, 0%, 98%)");
          this._root.style.setProperty("--color-text", "hsl(200, 15%, 8%)");
        }
        this._switch = !this._switch;
      }.bind(this)
    );
  }
  _generateMarkup(dataEl) {
    return `
    <div class="card__img" style ="background-image: url(${dataEl.flags.png})">
    </div>
    <div class="card__details">
      <h2 class="card__title">${dataEl.name.common}</h2>
      <p class="card__item" data-item="population">
        Population: <span>${this.numebrFormat(dataEl.population)}</span>
      </p>
      <p class="card__item" data-item="region">
        Region: <span>${dataEl.region}</span>
      </p>
      <p class="card__item" data-item="capital">
      Capital: <span>${dataEl.capital?.[0]}</span>
      </p>
    </div>`;
  }

  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
  render(dataEl) {
    const markup = this._generateMarkup(dataEl);
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-name", dataEl.name.common.toLowerCase());
    element.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.insertAdjacentElement("afterbegin", element);
  }

  addhandlerCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((el) => {
      detailsView.addHandlerShow(el);
    });
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerChange(handler) {
    this._regionElement.addEventListener("change", handler);
  }
  addHandlerSearch(handler) {
    this._searchElement.addEventListener("input", handler);
  }
}

export default new MapView();
