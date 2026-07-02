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
        <div className="flex justify-center items-center gap-5 mt-12 py-5">
            <button
                className="w-10 h-10 rounded-lg border border-zinc-600 text-white flex items-center justify-center text-lg hover:border-white disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={currentPage === 1 || loading}
                onClick={() => loadPage(currentPage - 1)}
            >
                ←
            </button>

            <div className="flex gap-2">
                {pagesToShow.map((number) => (
                    <button
                        key={number}
                        className={`w-[35px] h-[35px] text-sm border-b-2 disabled:cursor-not-allowed ${
                            currentPage === number
                                ? 'text-white border-white font-bold'
                                : 'text-zinc-400 border-transparent hover:text-white'
                        }`}
                        onClick={() => loadPage(number)}
                        disabled={loading}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <button
                className="w-10 h-10 rounded-lg border border-zinc-600 text-white flex items-center justify-center text-lg hover:border-white disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages || loading}
                onClick={() => loadPage(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
