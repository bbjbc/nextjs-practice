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
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}
// 위 함수는 클라이언트 사이드에서 실행되지 않음. 위 함수가 실행된 후 HomePage 함수가 실행됨.
// 서버에서만 보이는 함수임
