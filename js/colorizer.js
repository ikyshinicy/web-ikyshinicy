(function () {
  try {
    const saved = localStorage.getItem('siteColors');
    if (saved) {
      const colors = JSON.parse(saved);
      Object.entries(colors).forEach(([key, val]) => {
        document.documentElement.style.setProperty(key, val);
      });
    }
  } catch (e) {}
})();
