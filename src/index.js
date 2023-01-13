import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { API, graphqlOperation } from "aws-amplify";
import { getTodo, listTodos } from "./graphql/queries";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import Root from "./routes/root";
import Index from "./routes/index";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import '@aws-amplify/ui-react/styles.css';
import Video, {
  loader as videoLoader
} from './routes/video';

Amplify.configure(awsExports);
// Create a client
const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: async () => {
          const listOfVideos = await API.graphql(graphqlOperation(listTodos));
          const theList = listOfVideos.data.listTodos.items;
          return theList;
        }
      },
      {
        element: <Video />,
        path: "videos/:videoID",
        loader: async ({ params }) => {
          const oneVideoItem = await API.graphql(
            graphqlOperation(getTodo, { id: params.videoID }));
          const video = oneVideoItem.data.getTodo;
          return video;
        }
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
