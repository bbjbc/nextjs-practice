export default function UserProfilePage({ username }) {
  return <h1>{username}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Boongranii",
    },
  };
}

// getStaticProps()는 getStaticPaths()와 함께 쓰여야 하지만 getServerSideProps()는 그렇지 않음.
