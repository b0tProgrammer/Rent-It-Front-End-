import Header from '../Header/Header.jsx';
import Products from '../Products/Products.jsx';
function MainScreen() {
    // call the api to get products!
    return (
        // render the products!
        <>
            <Header/>
            <Products/>
        </>
    )
}
export default MainScreen;