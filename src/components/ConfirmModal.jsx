const ConfirmModal = ({ open, title, message, confirmText = "Aceptar", cancelText, onConfirm, onCancel }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm text-center">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 mb-6">{message}</p>
                <div className="flex justify-center gap-3">
                    {cancelText && (
                        <button
                            className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:border-white hover:text-white"
                            onClick={onCancel}
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        className="px-5 py-2.5 rounded-lg bg-white text-zinc-900 font-bold hover:bg-zinc-200"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
