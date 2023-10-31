document.addEventListener("DOMContentLoaded", function() {
  const navigationItems = document.querySelectorAll(".homepage_navigation_list_item");

  navigationItems.forEach(function(item) {
    item.addEventListener("mouseover", function(event) {
      event.target.classList.add("highlighted");
    });

    item.addEventListener("mouseout", function(event) {
      event.target.classList.remove("highlighted");
    });

    const currentPage = window.location.pathname;
    const href = event.target.getAttribute("href");

    if (currentPage === href) {
      event.target.classList.add("active");
    }
  });
});
