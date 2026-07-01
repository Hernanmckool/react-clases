import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductsContext";
import ProductForm from "../items/ProductForm";

const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const INITIAL_STATE = {
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    slug: "",
};

// editingProduct: if it comes with data → edit mode, if null → add mode
const FormContainer = ({ closeModal, editingProduct = null }) => {

    const { createProduct, updateProduct } = useProducts();

    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(INITIAL_STATE);

    const mode = editingProduct ? "edit" : "add";

    // pre-fill the form when coming in edit mode
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name ?? "",
                price: editingProduct.price ?? "",
                description: editingProduct.description ?? "",
                stock: editingProduct.stock ?? "",
                category: editingProduct.category ?? "",
                slug: editingProduct.slug ?? "",
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file ?? null);
        // Update the visible name in the file input
        const label = document.getElementById("file-name");
        if (label) label.textContent = file ? file.name : "No file selected";
    };

    // Uploads the image to ImgBB and returns the URL, or null if it fails
    const uploadImage = async (file) => {
        const form = new FormData();
        form.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
            method: "POST",
            body: form,
        });

        const json = await res.json();
        return json.success ? json.data.url : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // This part runs when in add mode
            if (mode === "add") {
                if (!imageFile) {
                    alert("Please upload an image");
                    setLoading(false);
                    return;
                }

                const imageUrl = await uploadImage(imageFile);
                if (!imageUrl) throw new Error("Error uploading image");

                const newProduct = {
                    ...formData,
                    image: imageUrl,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                };

                await createProduct(newProduct);
                alert("Product added!");
                setFormData(INITIAL_STATE);
                setImageFile(null);

            // otherwise we're in edit mode
            } else {
                let imageUrl = editingProduct.image; // keep the current image by default

                if (imageFile) {
                    const newUrl = await uploadImage(imageFile);
                    if (!newUrl) throw new Error("Error uploading image");
                    imageUrl = newUrl;
                }

                const updatedData = {
                    ...formData,
                    image: imageUrl,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                };

                await updateProduct(editingProduct.id, updatedData);
                alert("Product updated!");
            }

            closeModal?.();

        } catch (error) {

            console.error("Error:", error);
            alert("An error occurred. Check the console.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            mode={mode}
            loading={loading}
        />
    );
};

export default FormContainer;
