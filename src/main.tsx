import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {App, ConfigProvider} from "antd";
import {RouterProvider} from "react-router-dom";
import 'chart.js/auto';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import {router} from "./router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{ token: { fontFamily: '"Open Sans", sans-serif' }, cssVar: true }}>
              <App style={{ height: '100%' }}>
                  <RouterProvider router={router} />
              </App>
          </ConfigProvider>
      </QueryClientProvider>
  </StrictMode>,
)
