const CATEGORIES = [
    "Fotografía",
    "Electrónica",
    "Computación",
    "Accesorios",
    "Video",
    "Otros",
];

const inputClasses = "bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white w-full";

const ProductForm = ({ formData, handleChange, handleSubmit, handleImageChange, mode = "add", loading }) => {
    return (
        <div>
            <h2 className="text-2xl font-normal text-white mb-8">
                {mode === "edit" ? "Editar Producto" : "Agregar Producto"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Nombre</label>
                    <input
                        className={inputClasses}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Cámara Nikon Z6"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Descripción</label>
                    <textarea
                        className={`${inputClasses} resize-y min-h-20`}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descripción del producto..."
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Precio</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-sm text-zinc-400 pointer-events-none">$</span>
                            <input
                                className={`${inputClasses} pl-7`}
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Stock</label>
                        <input
                            className={inputClasses}
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Categoría</label>
                    <select
                        className={inputClasses}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Seleccionar categoría...</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        {mode === "edit" ? "Nueva imagen (opcional)" : "Imagen"}
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white border border-white rounded-lg hover:bg-white/10">
                            Elegir archivo
                        </span>
                        <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <span className="text-xs text-zinc-400 truncate max-w-[200px]" id="file-name">
                            Sin archivo seleccionado
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="mt-2 self-end px-6 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-900 bg-white rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Guardando..." : mode === "edit" ? "Guardar cambios" : "Agregar producto"}
                </button>

            </form>
        </div>
    );
};

export default ProductForm;
