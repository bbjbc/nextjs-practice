import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage({ sale }) {
  const [sales, setSales] = useState(sale);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-faa3e-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  // 이렇게 하면 url을 통해 데이터가 반환됨

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, []);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-faa3e-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  //   if (!sales) {
  //     return <p>No data yet</p>;
  //   }

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-faa3e-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sale: transformedSales,
    },
    revalidate: 10,
  };
}

// useSWR()훅 - fetch API 사용. 캐싱 및 자동 유효성 재검사, 에러 시 요청 재시도, 코드 전체를 직접 작성하지 않아도 됨.
// SWR - Stale While Revalidate
