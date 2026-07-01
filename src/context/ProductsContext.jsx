import { createContext, useContext } from "react";
import { collection, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { usePagination } from "../hooks/usePagination";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const {
        data: products,
        loading,
        currentPage,
        totalPages,
        loadPage,
        refreshPage
    } = usePagination("products", "name", 4);

    const createProduct = async (newProduct) => {
        await addDoc(collection(db, "products"), newProduct);
        refreshPage();
    };

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, "products", id));
        refreshPage();
    };

    const updateProduct = async (id, updatedData) => {
        const ref = doc(db, "products", id);
        await updateDoc(ref, updatedData);
        refreshPage();
    };

    return (
        <ProductsContext.Provider value={{
            products, loading, currentPage, totalPages,
            loadPage, createProduct, deleteProduct, updateProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
