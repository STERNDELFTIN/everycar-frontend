import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // 기존 설정 유지
      v7_startTransition: true,   // startTransition 최적화 활성화
    },
  }
);

export default router;
