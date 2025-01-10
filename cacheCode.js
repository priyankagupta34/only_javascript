const CACHE = "TRY_CACH";
const RESOURCES_TO_CACHE = [
  "./",
  "./cache.js",
  "./index.html",
  "./range.html",
  "./test.html",
];
async function openCache() {
  return await caches.open(CACHE);
}
async function addResourcesToCache() {
  const opened = await openCache();
  opened.addAll(RESOURCES_TO_CACHE);
  console.log("Added all resources to the cache");
}
async function getFromCache(url) {
  const opened = await openCache();
  const response = await opened.match(url);
  if (response) {
    console.log("Got it from cache ", response);
    return response;
  }
  console.log("Cache miss ", response);
}
async function fetchWithCacheFallback(url) {
  const fromCache = await getFromCache(url);
  if (fromCache) {
    return fromCache;
  }
  const response = await fetch(url);
  const cache = await openCache();
  cache.put(url, response.clone());
  console.log("Added cache for ", url);
  return response;
}
