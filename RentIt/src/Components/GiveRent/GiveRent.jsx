import styles from "./GiveRent.module.css";
import Header from "../Header/Header";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function GiveRent() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  if(!token) {
    return(
      <>
        <h2>Please LogIn to give rent.</h2>
      </>
    )
  }

  const ownerName = localStorage.getItem("userName") || "Anonymous"; 

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("category", productType);
      formData.append("price", productPrice);
      formData.append("description", productDescription);
      formData.append("ownerName", ownerName);
      formData.append("image", productImage); // important: image file
      const resp = await fetch("http://localhost:5000/api/v1/products/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      console.log(resp);
      if (!resp.ok) {
        alert("Ad isn't published, try again!");
        return;
      }

      const result = await resp.json();
      console.log("Ad Published successfully", result);
      alert("Ad published successfully!");
    } catch (err) {
      console.error("Error publishing ad:", err);
      alert("Try Again!");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <Header />
      {isLoading && (
        <div className={styles.loaderOverlay}>
          <FadeLoader
            color={"#352828ff"}
            loading={isLoading}
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      )}
      <div className={styles.form}>
        <h2 className={styles.title}>Give Rent</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              type="text"
              placeholder="Ex: Camera"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="product-type">Product Type</label>
            <select
              id="product-type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="">Select product type</option>
              <option value="cars">cars</option>
              <option value="bikes">bikes</option>
              <option value="electronics">stationary</option>
              <option value="properties">properties</option>
              <option value="furniture">furniture</option>
              <option value="stationary">stationary</option>
              <option value="others">others</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="product-price">Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="Ex: 500$"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="product-description">Description</label>
            <textarea
              id="product-description"
              placeholder="Ex: This is a high-quality camera suitable for all your photography needs."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="product-image">Product Image</label>
            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </div>

          <button className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default GiveRent;