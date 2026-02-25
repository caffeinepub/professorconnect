import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Contact from './pages/Contact';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jobs',
  component: Jobs,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const routeTree = rootRoute.addChildren([indexRoute, jobsRoute, aboutRoute, contactRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
