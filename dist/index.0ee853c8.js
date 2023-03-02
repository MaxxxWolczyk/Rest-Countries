const parentEl = document.querySelector(".maps-view__container");
const createCard = function(dataEl) {
    const markup = `          
    <div class="card">
    <div class="card__img" style ="background-image: url(${dataEl.flags.png})">
    </div>
    <div class="card__details">
      <h2 class="card__title">${dataEl.name.common}</h2>
      <p class="card__item" data-item="population">
        Population: <span>${dataEl.population}</span>
      </p>
      <p class="card__item" data-item="region">
        Region: <span>${dataEl.region}</span>
      </p>
      <p class="card__item" data-item="capital">
      Capital: <span>${dataEl.capital?.[0]}</span>
      </p>
    </div>
  </div>`;
    parentEl.insertAdjacentHTML("afterbegin", markup);
};
//
const renderCountries = async function() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    data.forEach((el)=>{
        createCard(el);
    });
};
renderCountries();

//# sourceMappingURL=index.0ee853c8.js.map
