import AdminAnalytics from './pages/AdminAnalytics';
import AdminUsers from './pages/AdminUsers';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';
// ...

<Routes>
  <Route path="/admin" element={
      <AdminRoute><AdminPanel /></AdminRoute>
  } />
  <Route path="/admin/analytics" element={
      <AdminRoute><AdminAnalytics /></AdminRoute>
  } />
  <Route path="/admin/users" element={
      <AdminRoute><AdminUsers /></AdminRoute>
  } />
  {/* ... */}
</Routes>