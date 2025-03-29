import reducer, { uiActions, initialState } from "./uiSlice";
import { describe, it, expect } from "vitest";

describe("uiSlice reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should update searchCityText", () => {
    const newState = reducer(initialState, uiActions.changeSearchCityText("Lagos"));
    expect(newState.searchCityText).toBe("Lagos");
  });

  it("should update favoriteCitiesId", () => {
    const newFavorites = [1, 2, 3];
    const newState = reducer(initialState, uiActions.changeFavoriteCitiesId(newFavorites));
    expect(newState.favoriteCitiesId).toEqual(newFavorites);
  });

  it("should update removedCitiesId", () => {
    const removedIds = [5, 6, 7];
    const newState = reducer(initialState, uiActions.changeRemovedCitiesId(removedIds));
    expect(newState.removedCitiesId).toEqual(removedIds);
  });

  it("should toggle showRemovedCities", () => {
    const newState = reducer(initialState, uiActions.toggleShowRemovedCities());
    expect(newState.showRemovedCities).toBe(true);
    const toggledBackState = reducer(newState, uiActions.toggleShowRemovedCities());
    expect(toggledBackState.showRemovedCities).toBe(false);
  });

  it("should update showRemovedCities to a specific value", () => {
    const newState = reducer(initialState, uiActions.changeShowRemovedCities(true));
    expect(newState.showRemovedCities).toBe(true);
  });
});
