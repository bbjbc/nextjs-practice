import path from "path";
import fs from "fs/promises";

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // console.log("re-generating"); // 개발서버에서는 새로고침 시 마다 생성되지만, 빌드 이후에는 10초가 지나야만 뜸.
  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // 페이지로 들어오는 모든 요청에 대해 마지막으로 재생성된 지 10초가 지나면 재생성 되어야 한다고 말하는 것임.
    // 자동 데이터 재빌드 느낌
  };
}
// 위 함수는 클라이언트 사이드에서 실행되지 않음. 위 함수가 실행된 후 HomePage 함수가 실행됨.
// 서버에서만 보이는 함수임
