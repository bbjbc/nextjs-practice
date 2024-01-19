import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage({ feedbackItems }) {
  return (
    <ul>
      {feedbackItems.map((item) => (
        <li key={item.id}>
          {item.text}
          <sub>&nbsp;&nbsp;&nbsp;by {item.email}</sub>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
// getStaticProps()나 getServerSideProps()를 사용할 때에는 외부 API를 fetch 가능하지만 내부에서 만든 API는 사용 불가능함.
