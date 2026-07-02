import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/config";

export const usePagination = (collectionName, orderField = "name", itemsPerPage = 8) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docHistory, setDocHistory] = useState([null]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchTotal = async () => {
        try {
            const snapshot = await getCountFromServer(collection(db, collectionName));
            setTotalPages(Math.ceil(snapshot.data().count / itemsPerPage));
        } catch (error) {
            console.error("Error fetching total:", error);
        }
    };

    const loadPage = async (pageNumber) => {
        setLoading(true);

        try {
            let q;

            if (pageNumber === 1) {
                q = query(
                    collection(db, collectionName),
                    orderBy(orderField),
                    limit(itemsPerPage)
                );
            } else {
                const previousDoc = docHistory[pageNumber - 1];

                q = query(
                    collection(db, collectionName),
                    orderBy(orderField),
                    startAfter(previousDoc),
                    limit(itemsPerPage)
                );
            }

            const snapshot = await getDocs(q);

            const items = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setData(items);
            setCurrentPage(pageNumber);

            if (!docHistory[pageNumber] && snapshot.docs.length > 0) {
                const lastDoc = snapshot.docs[snapshot.docs.length - 1];

                const newHistory = [...docHistory];
                newHistory[pageNumber] = lastDoc;
                setDocHistory(newHistory);
            }

        } catch (error) {
            console.error("Error loading page:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setDocHistory([null]);
        fetchTotal();
        loadPage(1);
    }, [collectionName]);

    const refreshPage = () => {
        fetchTotal();
        loadPage(currentPage);
    };

    return {
        data,
        loading,
        currentPage,
        totalPages,
        loadPage,
        refreshPage
    };
};
