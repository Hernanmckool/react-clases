import styles from './styles/Pagination.module.css';

const Pagination = ({ currentPage, totalPages, loadPage, loading }) => {
    const maxButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const pagesToShow = [];
    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.navButton}
                disabled={currentPage === 1 || loading}
                onClick={() => loadPage(currentPage - 1)}
            >
                ←
            </button>

            <div className={styles.numbers}>
                {pagesToShow.map((number) => (
                    <button
                        key={number}
                        className={`${styles.numberButton} ${currentPage === number ? styles.active : ''}`}
                        onClick={() => loadPage(number)}
                        disabled={loading}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <button
                className={styles.navButton}
                disabled={currentPage === totalPages || loading}
                onClick={() => loadPage(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
