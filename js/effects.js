// effects.js
// 1. Spark on click

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
});
