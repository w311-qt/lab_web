document.addEventListener("DOMContentLoaded", function() {
  const navigationItems = document.querySelectorAll(".homepage_navigation_list_item");

  navigationItems.forEach(function(item) {
    item.addEventListener("mouseover", function(event) {
      event.target.classList.add("highlighted");
    });

    item.addEventListener("mouseout", function(event) {
      event.target.classList.remove("highlighted");
    });
  });

  const sportsLinks = document.querySelectorAll(".sports");

  sportsLinks.forEach(function(link) {
    link.addEventListener("mouseover", function(event) {
      event.target.classList.add("highlighted");
    });

    link.addEventListener("mouseout", function(event) {
      event.target.classList.remove("highlighted");
    });
  });
});
