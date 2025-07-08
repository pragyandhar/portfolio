// effects.js
// 1. Spark on click
// 2. Background movement on mouse move

document.addEventListener('DOMContentLoaded', () => {
  // --- White Spark Burst on Click ---
  document.body.addEventListener('click', function(e) {
    const numSparks = 14;
    for (let i = 0; i < numSparks; i++) {
      const spark = document.createElement('div');
      spark.className = 'white-spark';
      const angle = (2 * Math.PI * i) / numSparks;
      const distance = 36 + Math.random() * 18;
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      spark.style.setProperty('--angle', `${angle}rad`);
      spark.style.setProperty('--distance', `${distance}px`);
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 400);
    }
  });

  // --- Dynamic Background Movement ---
  // Add a background layer if not present
  let bgLayer = document.getElementById('bg-animated');
  if (!bgLayer) {
    bgLayer = document.createElement('div');
    bgLayer.id = 'bg-animated';
    document.body.prepend(bgLayer);
  }
  // Animate background gradient position
  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    bgLayer.style.setProperty('--bg-x', `${x * 100}%`);
    bgLayer.style.setProperty('--bg-y', `${y * 100}%`);
  });
});
