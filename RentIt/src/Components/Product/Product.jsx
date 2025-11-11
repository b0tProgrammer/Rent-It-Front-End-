import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.css";
import { FadeLoader } from "react-spinners";
import { FaWhatsapp } from "react-icons/fa";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    setLoading(true);
    try {
      const resp = await fetch(`http://localhost:5000/api/v1/products/get/${id}`);
      if (!resp.ok) {
        console.error("Failed to fetch product:", resp.status);
        return;
      }
      const result = await resp.json();
      console.log("Product fetched:", result);
      setProduct(result.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    const phone = product?.owner?.phone;
    if (!phone) {
      alert("No contact number available for this product!");
      return;
    }
    const cleanedPhone = phone.replace(/\D/g, "");
    const message = encodeURIComponent(`Hi, I'm interested in your product "${product.name}".`);
    window.open(`https://wa.me/${cleanedPhone}?text=${message}`, "_blank");
  }

  if (loading)
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

  if (!product) return <p className={styles.notFound}>Product not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className={styles.image}
        />
        <div className={styles.info}>
          <h1>{product.name}</h1>
          <p className={styles.category}>Category: {product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>₹{product.price}</p>
          <p className={product.isAvailable ? styles.available : styles.unavailable}>
            {product.isAvailable ? "Available for Rent" : "Not Available"}
          </p>

          {/* Owner Details */}
          {product.owner && (
            <div className={styles.ownerSection}>
              <h3>Owner Details</h3>
              <div className={styles.ownerInfo}>
                <div>
                  <p><strong>Name:</strong> {product.owner.username}</p>
                  <p><strong>Email:</strong> {product.owner.email}</p>
                  <p><strong>Phone:</strong> {product.owner.phone || "Not available"}</p>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Button */}
          {(product.owner?.phone || product.phone) && (
            <button onClick={openWhatsApp} className={styles.whatsappBtn}>
              <FaWhatsapp size={20} /> Contact on WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;