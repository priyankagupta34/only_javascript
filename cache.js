/**
 * Cache inbuild functions
add
addAll
delete
keys
match
matchAll
put()
 */
const CACHE_NAME = "my-cache-v1";
const RESOURCES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/logo.png",
];

// Helper Function: Open the Cache
async function openCache() {
  return await caches.open(CACHE_NAME);
}

// 1. Add Resources to Cache
async function addResourcesToCache() {
  const cache = await openCache();
  await cache.addAll(RESOURCES_TO_CACHE);
  console.log("Resources added to cache:", RESOURCES_TO_CACHE);
}

// 2. Retrieve a Cached Resource
async function getFromCache(url) {
  const cache = await openCache();
  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    console.log(`Cache hit for ${url}`);
    return cachedResponse;
  }
  console.log(`Cache miss for ${url}`);
  return fetch(url); // Fetch from network if not in cache
}

// 3. Update a Resource in Cache
async function updateCache(url) {
  const cache = await openCache();
  const response = await fetch(url);

  if (response.ok) {
    await cache.put(url, response.clone());
    console.log(`Updated cache for ${url}`);
  } else {
    console.error(`Failed to update cache for ${url}`);
  }
}

// 4. Delete a Specific Cache
async function deleteCache(cacheName) {
  const isDeleted = await caches.delete(cacheName);
  if (isDeleted) {
    console.log(`Cache "${cacheName}" deleted.`);
  } else {
    console.error(`Cache "${cacheName}" not found.`);
  }
}

// 5. List All Cache Keys
async function listAllCaches() {
  const cacheKeys = await caches.keys();
  console.log("All cache keys:", cacheKeys);
}

// 6. Clear Old Caches
async function clearOldCaches() {
  const cacheWhitelist = [CACHE_NAME];
  const cacheKeys = await caches.keys();

  await Promise.all(
    cacheKeys.map((key) => {
      if (!cacheWhitelist.includes(key)) {
        console.log(`Deleting old cache: ${key}`);
        return caches.delete(key);
      }
    })
  );

  console.log("Old caches cleared.");
}

// 7. Fetch with Cache Fallback
async function fetchWithCacheFallback(url) {
  const cachedResponse = await getFromCache(url);

  if (cachedResponse) {
    return cachedResponse;
  }
  const networkResponse = await fetch(url);
  const cache = await openCache();

  // Cache the new response for future use
  if (networkResponse.ok) {
    await cache.put(url, networkResponse.clone());
    console.log(`Fetched and cached ${url}`);
  }

  return networkResponse;
}

// Usage Example
(async function runCacheOperations() {
  console.log("Starting Cache API operations...");

  // 1. Add Resources to Cache
  await addResourcesToCache();

  // 2. Retrieve a Cached Resource
  const cachedPage = await getFromCache("/index.html");
  console.log("Cached Page:", await cachedPage.text());

  // 3. Update a Cached Resource
  await updateCache("/styles.css");

  // 4. List All Cache Keys
  await listAllCaches();

  // 5. Fetch with Cache Fallback
  const response = await fetchWithCacheFallback("/script.js");
  console.log("Fetched Content:", await response.text());

  // 6. Clear Old Caches
  await clearOldCaches();

  // 7. Delete a Specific Cache
  await deleteCache(CACHE_NAME);
})();
