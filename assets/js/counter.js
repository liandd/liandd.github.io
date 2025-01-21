document.addEventListener("DOMContentLoaded", function() {
    // Get the current view count from localStorage
    let views = localStorage.getItem('profileViews');
  
    // If there's no view count, set it to 0
    if (!views) {
      views = 0;
    }
  
    // Increment the count
    views = parseInt(views) + 1;
  
    // Update localStorage
    localStorage.setItem('profileViews', views);
  
    // Update the counter in the SVG
    document.getElementById("view-count").textContent = views;
  });