import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import KataloziPage from './pages/KataloziPage'
import ONamaPage from './pages/o_nama'
import ServisPage from './pages/ServisPage'
import ProizvodiPage from './pages/ProizvodiPage'
import ProizvodiSlavine from './pages/ProizvodiSlavine'
import ProizvodSlavinaDetalj from './pages/ProizvodSlavinaDetalj'
import ProizvodiKupanjeTusiranje from './pages/ProizvodiKupanjeTusiranje'
import ProizvodiSanitarije from './pages/ProizvodiSanitarije'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'

const routeConfig = [
  { path: '/', element: <LandingPage /> },
  { path: '/katalozi', element: <KataloziPage /> },
  { path: '/o-nama', element: <ONamaPage /> },
  { path: '/servis', element: <ServisPage /> },
  { path: '/proizvodi', element: <ProizvodiPage /> },
  { path: '/proizvodi/slavine', element: <ProizvodiSlavine /> },
  { path: '/proizvodi/slavine/:id', element: <ProizvodSlavinaDetalj /> },
  { path: '/proizvodi/kupanje-tusiranje', element: <ProizvodiKupanjeTusiranje /> },
  { path: '/proizvodi/sanitarije', element: <ProizvodiSanitarije /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:id', element: <BlogPostPage /> },
]

const renderRouteSet = (prefix = '') => (
  <Fragment>
    {routeConfig.map((route) => {
      const resolvedPath =
        prefix === ''
          ? route.path
          : route.path === '/'
            ? prefix
            : `${prefix}${route.path}`

      return (
        <Route
          key={`${prefix || 'root'}:${route.path}`}
          path={resolvedPath}
          element={route.element}
        />
      )
    })}
  </Fragment>
)

const AppRoutes = () => (
  <Routes>
    {renderRouteSet('')}
    {renderRouteSet('/slo')}
    {renderRouteSet('/rs')}
  </Routes>
)

export default AppRoutes

