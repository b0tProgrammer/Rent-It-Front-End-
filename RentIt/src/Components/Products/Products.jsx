import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function getProducts() {
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/v1/products/all");
      if (!resp.ok) {
        console.error("failed to load products, status:", resp.status);
        setProducts([]);
        return;
      }
      const result = await resp.json();
      const items = result?.data.products || [];
      setProducts(items);
      // console.log("Products loaded successfully (count):", items.length);
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
      <div className={styles.loaderOverlay}>
        <FadeLoader
          color={"#393535ff"}
          loading={loading}
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
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
          const available = p.isAvailable;
          const image =
            p.image ||
            p.imageUrl ||
            (p.productImage && p.productImage.url) ||
            "";
          return (
            <div
              className={styles.card}
              key={id}
              onClick={() => navigate(`/product/${id}`)}
            >
              {image ? (
                <img src={image} alt={title} className={styles.thumb} />
              ) : (
                <div className={styles.noImage}>No image</div>
              )}
              <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.price}>{price}</div>
                <div
                  className={
                    available ? styles.available : styles.unavailable
                  }
                >
                  {available ? "Available" : "Unavailable"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
