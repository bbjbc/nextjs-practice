import { useRef } from "react";

function HomePage() {
  const emailInput = useRef();
  const feedbackInput = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredFeedback = feedbackInput.current.value;

    fetch(); // { email: 'test@test.com', text: 'Some feedback text' }
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" row="5" ref={feedbackInput} />
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
