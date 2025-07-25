import AuthProvider from "./context/AuthContext";
// ...other imports

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);