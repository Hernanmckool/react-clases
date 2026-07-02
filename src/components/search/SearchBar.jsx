import { useSearch } from "../../context/SearchContext";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
    const { search, setSearch } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);

        // On the Dashboard, search filters the inventory list in place
        // instead of navigating away to the public /search results.
        const isOnDashboard = location.pathname.startsWith("/dashboard");
        if (value.trim() && !isOnDashboard) {
            navigate("/search");
        }
    };

    return (
        <form className="max-w-md w-full mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none">
                    <svg
                        className="w-4 h-4 text-zinc-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="search"
                    className="w-full pl-10 pr-4 py-2.5 text-sm text-white bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-white placeholder:text-zinc-500"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>
        </form>
    );
};

export default SearchBar;
