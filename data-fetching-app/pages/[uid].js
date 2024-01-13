export default function UserIdPage({ id }) {
  return <h1>{id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

// 위 함수는 서버에서만 작동하고 next.js에서 아무 페이지도 사전 생성할 필요가 없고 사전 생성할 페이지가 없기 때문에 getStaticPaths()가 필요하지 않음.
// 서버 사이드 코드에서 모든 요청을 처리함. -> 사전 생성할 필요 없고, 동적 경로도 미리 설정하지 않아도 됨.
