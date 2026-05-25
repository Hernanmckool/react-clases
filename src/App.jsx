import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ProductDetail from './components/items/ProductDetail';
import ItemListContainer from './components/items/ItemListContainer';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
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
                </Route>
            </Routes>
        </>
    );
}

export default App;