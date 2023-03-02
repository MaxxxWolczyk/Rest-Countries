import mapsView from "./mapsView";
import icons from "url:../images/icons.svg";

class DetailView {
  _backBtn = document.querySelector(".detail-view__btn");
  _parentElement = document.querySelector(".detail-view");
  _countryElement = document.querySelector(".maps-view");
  _viewCard = document.querySelector(".view-card");

  numebrFormat(number) {
    const formated = new Intl.NumberFormat().format(number);
    return formated;
  }

  _hideDetailPage() {
    this._parentElement.style.display = "none";
    this._countryElement.style.display = "block";
  }

  _showDetailPage() {
    this._parentElement.style.display = "block";
    this._countryElement.style.display = "none";
  }

  _generateDetail(data) {
    const detailMarkup = data.countries[0].borders
      .map((el) => {
        let fullname = data.names.find((item) => item.fifa === el);
        if (fullname === undefined)
          return `<button class="view-card__btn btn-detail btn" data-name ="${el}">${el}</button>`;
        return `<button class="view-card__btn btn-detail btn" data-name ="${el}">${fullname.name}</button>`;
      })
      .join(" ");

    return detailMarkup;
  }

  _generateHtml(data) {
    return `
    <div class="view-card__img">
      <img src="${data.countries[0].flags.png}" alt="country flag" />
    </div>
    <div class="view-card__details">
      <h2 class="view-card__title">${data.countries[0].name.common}</h2>
      <div class="view-card__description">
        <p class="view-card__item">Native Name: <span>${
          data.countries[0].name.official
        }</span></p>
        <p class="view-card__item">Population: <span>${this.numebrFormat(
          data.countries[0].population
        )}</span></p>
        <p class="view-card__item">Region: <span>${
          data.countries[0].region
        }</span></p>
        <p class="view-card__item">Sub Region: <span>${
          data.countries[0].subregion
        }</span></p>
        <p class="view-card__item">Capital: <span>${
          data.countries[0].capital
            ? data.countries[0].capital
            : "Nothing found"
        }</span></p>
        <p class="view-card__item">Top Level Domain: <span>${
          data.countries[0].fifa
        }</span></p>
        <p class="view-card__item">Currencies: <span>${
          data.countries[0].currencies
            ? Object.values(data.countries[0].currencies)[0].name
            : "Nothing found"
        }</span></p>
        <p class="view-card__item">Languages: <span>${
          Object.values(data.countries[0].languages)[0]
        }</span></p>
      </div>
      <div class="view-card__border-box">
      <p class="view-card__item">Border Countries:</p>
      ${
        data.countries[0].borders ? this._generateDetail(data) : "Nothing found"
      }
        
      </div>
    </div>`;
  }

  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._viewCard.innerHTML = "";
    this._viewCard.insertAdjacentHTML("afterbegin", markup);
  }

  renderDetail(data) {
    this._viewCard.innerHTML = "";
    const markup = this._generateHtml(data);
    this._viewCard.insertAdjacentHTML("beforeend", markup);
  }

  addHandlerClose() {
    this._backBtn.addEventListener("click", this._hideDetailPage.bind(this));
  }

  addHandlerShow(card) {
    card.addEventListener("click", this._showDetailPage.bind(this));
  }

  addHandlerGetInfo(handler) {
    this._countryElement.addEventListener("click", function (e) {
      // console.log(e.target);
      if (e.target.closest(".card") === null) return;
      handler(e.target.closest(".card").dataset.name);
    });
  }

  addHandlerBorder(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // console.log(e.target);
      if (e.target.closest(".view-card__btn") === null) return;
      handler(e.target.closest(".view-card__btn").dataset.name);
    });
  }
}

export default new DetailView();
