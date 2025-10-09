import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';
import { PageLayout } from '@/components/layout/PageLayout';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
