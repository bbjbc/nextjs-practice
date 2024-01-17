import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// _app.js는 애플리케이션 셸(shell)임. HTML 문서의 body 섹션 속 루트 컴포넌트임.
// _document.js는 전체 HTML 문서를 커스터마이징할 수 있게 해줌.
// 위 div는 react에서 portal을 사용할 때 유용함. (Modal 사용 시) - _document.js가 react에서 index.js 같은 느낌임.
