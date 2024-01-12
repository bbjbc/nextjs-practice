import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage({ loadedProduct }) {
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}
// 동적 파라미터를 가진 동적 페이지에서는 정적 생성 (getStaticProps())를 사용하면 오류가 생김
// 이유는 [pid]에서 어떤 값이 지원되는지 모르기 때문임. 기본 값이 아니기 때문임. 동적 세그먼트가 정확히 어떤 값인지도 모르기 때문임.

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}
// getStaticPaths()는 동적 페이지의 어떤 구체적인 인스턴스를 사전 생성할지 알려주는 함수임.
