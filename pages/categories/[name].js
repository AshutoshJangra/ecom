import Header from "../../components/header";
import ProductList from "../../components/product/productList";

export default function CategoriesProduct(props){

    console.log("in catgeory name ", props)
    return(
        <div>
            <Header/>
            <ProductList products={props.data.data} />
            
        </div>
    )
}

export async function getServerSideProps(req) {
    const {name}=req.params;

    console.log("req param" , req.params)
    const res = await fetch(`http://localhost:3000/api/product?name=${name}`);
  
    console.log("sdsdsdsdd");
    const data = await res.json();
    return { props: { data } };
  }
  