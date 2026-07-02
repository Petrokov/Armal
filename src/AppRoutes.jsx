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
import LegalPage from './pages/LegalPage'
import {
  AdminBlogEditorPage,
  AdminBlogListPage,
  AdminCatalogEditorPage,
  AdminCatalogListPage,
  AdminLoginPage,
  AdminTeamEditorPage,
  AdminTeamListPage,
} from './pages/AdminPages'

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
  { path: '/privacy-policy', element: <LegalPage type="privacy-policy" /> },
  { path: '/terms-of-service', element: <LegalPage type="terms-of-service" /> },
  { path: '/cookie-policy', element: <LegalPage type="cookie-policy" /> },
]

const adminRouteConfig = [
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin/blog', element: <AdminBlogListPage /> },
  { path: '/admin/blog/:id', element: <AdminBlogEditorPage /> },
  { path: '/admin/catalogs', element: <AdminCatalogListPage /> },
  { path: '/admin/catalogs/:id', element: <AdminCatalogEditorPage /> },
  { path: '/admin/team', element: <AdminTeamListPage /> },
  { path: '/admin/team/:id', element: <AdminTeamEditorPage /> },
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
    {adminRouteConfig.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))}
  </Routes>
)

export default AppRoutes

