var CACHE = 'piano-course-v4';
var FILES = ['./','./index.html','./Piano_App.html','./00_Start_Here.html','./01_Foundations.html','./02_Reading_Music.html','./03_Technique_Scales_Arpeggios.html','./04_Chords_and_Harmony.html','./05_Repertoire.html','./06_Practice_System.html','./07_Practice_Tools.html','./manifest.webmanifest','./icon-180.png','./icon-512.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  e.respondWith(caches.match(e.request).then(function(hit){
    return hit || fetch(e.request).then(function(res){
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      return res;
    });
  }).catch(function(){ return caches.match('./Piano_App.html'); }));
});
