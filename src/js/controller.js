import * as model from "./model";
import mapView from "./mapsView";
import detailsView from "./detailsView";
import mapsView from "./mapsView";

const controllMapsView = async function () {
  //Loading all countries data from API
  await model.loadAllCountries("all");
  //Rendering all countries
  model.state.countries.forEach((el) => mapView.render(el));
  mapsView.addhandlerCards();
};

const controllRegion = async function (e) {
  if (e.target.value === "all") {
    controllMapsView();
    return;
  }
  await model.loadAllCountries(`region/${e.target.value}`);
  mapView.clear();
  model.state.countries.forEach((el) => {
    mapView.render(el);
  });
  mapsView.addhandlerCards();
};

const controllInput = async function (e) {
  if (e.target.value.length <= 0) {
    controllMapsView();
  }

  await model.loadAllCountries(
    `${e.target.value ? `name/${e.target.value}` : "all"}`
  );

  mapView.clear();
  model.state.countries.forEach((el) => mapView.render(el));
  mapsView.addhandlerCards();
};

const controllDetail = async function (data) {
  if (!data) return;
  detailsView.renderSpinner();
  await model.loadAllCountries(`name/${data}`);
  detailsView.renderDetail(model.state);
  mapsView.addhandlerCards();
};
const controllDetailbtn = async function (data) {
  if (!data) return;
  detailsView.renderSpinner();
  await model.loadAllCountries(`alpha/${data}`);
  detailsView.renderDetail(model.state);
  mapsView.addhandlerCards();
};

const init = function () {
  mapView.darkmode();
  mapView.addHandlerRender(controllMapsView);
  mapView.addHandlerChange(controllRegion);
  mapView.addHandlerSearch(controllInput);
  detailsView.addHandlerClose();
  detailsView.addHandlerGetInfo(controllDetail);
  detailsView.addHandlerBorder(controllDetailbtn);
};

init();
