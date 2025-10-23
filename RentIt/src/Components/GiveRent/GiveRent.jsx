import styles from "./GiveRent.module.css";
import Header from "../Header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GiveRent() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.sub : "null";

  if(!token) {
    return(
      <>
        <h2>Please LogIn to give rent.</h2>
      </>
    )
  }

  const ownerName = "null"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      productName,
      productType,
      productPrice,
      productDescription,
      productImage,
      ownerName,
    });
  };

  return (
    <>
      <Header />
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default GiveRent;