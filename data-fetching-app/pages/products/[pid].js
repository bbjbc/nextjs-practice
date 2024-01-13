import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy_backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}
// 동적 파라미터를 가진 동적 페이지에서는 정적 생성 (getStaticProps())를 사용하면 오류가 생김
// 이유는 [pid]에서 어떤 값이 지원되는지 모르기 때문임. 기본 값이 아니기 때문임. 동적 세그먼트가 정확히 어떤 값인지도 모르기 때문임.

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    //   { params: { pid: "p2" } },
    //   { params: { pid: "p3" } },
    fallback: true, // blocking으로 설정할 경우에는 위에 Loading을 추가하지 않아도 됨. -> 서버에 완전히 사전 생성될 때까지 NextJS가 기다릴 것임.
    // fallback을 true로 설정하면 p1만 설정해도 나머지 두 id가 작동함.
    // 사전에 생성되는 것은 아니고 요청이 서버에 도달하는 순간 시점에 생성되는 것임.
    // 하지만, url로 p2, p3를 입력하면 오류 -> 동적 사전 생성 기능이 즉시 끝나지 않기 때문임.
  };
}
// getStaticPaths()는 동적 페이지의 어떤 구체적인 인스턴스를 사전 생성할지 알려주는 함수임.
