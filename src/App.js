import './App.css';

function App() {
   return null;
}

document.addEventListener("DOMContentLoaded", () => {
  const hiddenElements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target); // Stop observing after it's shown
          }
      });
  });

  hiddenElements.forEach(element => observer.observe(element));
  
});
document.addEventListener("DOMContentLoaded", function () {
  const reviewCards = document.querySelectorAll(".review-card");

  // Initialize Intersection Observer
  const observer = new IntersectionObserver(
      (entries, observer) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  // When the element is visible, add the "visible" class
                  entry.target.classList.add("visible");
                  observer.unobserve(entry.target); // Stop observing once loaded
              }
          });
      },
      { root: null, threshold: 0.1 } // Trigger when 10% of the card is visible
  );

  // Attach observer to each review card
  reviewCards.forEach((card) => observer.observe(card));
});

export default App;
