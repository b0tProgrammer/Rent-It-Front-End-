
import { useEffect, useState } from "react";
import styles from "./Products.module.css";

function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    async function getProducts() {
        setLoading(true);
        try {
            const resp = await fetch("http://localhost:5000/api/v1/all");
            if (!resp.ok) {
                console.error("failed to load products, status:", resp.status);
                setProducts([]);
                return;
            }
            const result = await resp.json();
            const items = result.data || result.products || result || [];
            setProducts(Array.isArray(items) ? items : []);
            console.log("Products loaded successfully:", items);
        } catch (err) {
            console.error("Error loading products:", err);
            setProducts([]);
        } finally { 
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return (
            <div className={styles.center}>
                <div className={styles.spinner} aria-hidden="true" />
                <div>Loading products...</div>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className={styles.center}>
                <p>No products available.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {products.map((p, idx) => {
                    const id = p.id || p._id || idx;
                    const title = p.name || p.productName || p.title || "Untitled";
                    const price = p.price || p.productPrice || p.amount || "-";
                    const image = p.image || p.imageUrl || (p.productImage && p.productImage.url) || "";
                    return (
                        <div className={styles.card} key={id}>
                            {image ? (
                                <img src={image} alt={title} className={styles.thumb} />
                            ) : (
                                <div className={styles.noImage}>No image</div>
                            )}
                            <div className={styles.info}>
                                <h3 className={styles.title}>{title}</h3>
                                <div className={styles.price}>{price}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;