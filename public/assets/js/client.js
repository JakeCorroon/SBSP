function removeKey(key) {
  const parsed = parsedSearch();
  delete parsed[key];
  return parsed;
}

function parsedSearch() {
  const search = window.location.search;
  return Qs.parse(search.replace(/^\?/, ''));
}

function createKeyUpHandler(elementId, queryKey, debounceTime = 500) {
  const method = () => {
    const href = window.location.origin + window.location.pathname;
    const value = document.getElementById(elementId).value;
    const newSearch = Qs.stringify( value ? {
      ...parsedSearch(),
      [queryKey]: value
    } : removeKey(queryKey));
    return window.location.replace(href + '?' + newSearch);
  };
  if (debounceTime && debounceTime > 0) {
    return _.debounce(method, debounceTime);
  }
  return method;
}

function onRowClick(e) {
  const dataset = e.target.parentNode.dataset;
  if (dataset.link) {
    window.open(dataset.link, '_blank');
  }
}

function onClearFilters() {
  const href = window.location.origin + window.location.pathname;
  return window.location.replace(href);
}

function initializeFromSearch (mapping) {
  const searchObject = Qs.parse(window.location.search.replace(/^\?/, ''));
  Object.keys(mapping).forEach((key) => {
    const elementId = mapping[key];
    const valueFromSearch = searchObject[key];
    if (valueFromSearch) {
      document.getElementById(elementId).value = valueFromSearch;
    }
  });
  return searchObject;
}
