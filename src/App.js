import './App.css';

function App() {
    const sendMessageToSlack = async () => {
        const payload = {
          text: "Hi from React!",
        };
    
        try {
          const response = await fetch("https://hooks.slack.com/services/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", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            alert("Message sent to Slack successfully!");
          } else {
            alert("Failed to send message to Slack.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while sending the message.");
        }
      };
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Send a Message to Slack</h1>
          <button
            onClick={sendMessageToSlack}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4A154B",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send Hi to Slack
          </button>
        </div>
      );
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
