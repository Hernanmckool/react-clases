import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ProductDetail from './components/items/ProductDetail';
import ItemListContainer from './components/items/ItemListContainer';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashboard from './components/forms/Dashboard';
import SearchResults from './components/search/SearchResults';
import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<h1>Home</h1>} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/products' element={<ItemListContainer />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/search' element={<SearchResults />} />

                    <Route
                        path='/dashboard'
                        element={
                            <ProtectedRoutes allowedRoles={["admin"]}>
                                <Dashboard />
                            </ProtectedRoutes>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;