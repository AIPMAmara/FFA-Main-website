import { Route, Routes } from 'react-router-dom'
import MetaSync from './components/MetaSync'
import SiteLayout from './layouts/SiteLayout'
import { routes } from './routes'

function App() {
  return (
    <>
      <MetaSync />
      <Routes>
        <Route element={<SiteLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              index={route.path === '/'}
              path={route.path === '/' ? undefined : route.path.slice(1)}
              element={route.element}
            />
          ))}
        </Route>
      </Routes>
    </>
  )
}

export default App
