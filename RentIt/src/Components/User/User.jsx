import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { FadeLoader } from "react-spinners";

function User() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "null";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    if (!token || userName === "null") {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, []);

  async function fetchUserData() {
    setLoading(true);
    try {
      const resp = await fetch(
        "http://localhost:5000/api/v1/products/my-products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!resp.ok) {
        console.error("Failed to fetch user data:", resp.status);
        return;
      }
      const result = await resp.json();
      setUserProducts(result?.data?.products || []);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  }

  async function handleDelete(productId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      const resp = await fetch(
        `http://localhost:5000/api/v1/products/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.ok) {
        setUserProducts((prev) => prev.filter((p) => p._id !== productId));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  // Toggle availability API call
  async function toggleAvailability(productId) {
    // console.log("Toggling availability for product ID:", productId);
    // setLoading(true);
    try {
      const resp = await fetch(
        `http://localhost:5000/api/v1/products/toggle/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isAvailable: undefined }), // Backend toggles the value
        }
      );
      if (resp.ok) {
        setUserProducts((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, isAvailable: !p.isAvailable } : p
          )
        );
      } else {
        alert("Failed to update availability.");
      }
    } catch (err) {
      console.error("Error updating availability:", err);
    }
  }

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

  return (
    <div className={styles.userContainer}>
      <div className={styles.header}>
        <h1>Welcome, {userName}!</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <h2>Your Products</h2>
      {userProducts.length === 0 ? (<p>No products found.</p>) : (
      <div className={styles.productGrid}>
        {userProducts.map((product) => (
          <div className={styles.productCard} key={product._id}>
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className={styles.price}>₹{product.price}</p>
              <p
                className={
                  product.isAvailable ? styles.available : styles.unavailable
                }
              >
                {product.isAvailable ? "Available for Rent" : "Rented Out"}
              </p>
            </div>
            <div className={styles.productActions}>
              <button
                className={`${styles.rentBtn} ${
                  product.isAvailable ? "" : styles.disabledBtn
                }`}
                // disabled={product.isAvailable}
                onClick={() => toggleAvailability(product._id)}
              >
                Give on Rent
              </button>
              <button
                className={`${styles.makeAvailableBtn} ${
                  product.isAvailable ? styles.disabledBtn : ""
                }`}
                // disabled={!product.isAvailable}
                onClick={() => toggleAvailability(product._id)}
              >
                Make Available for Rent
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default User;
