import Header from "../components/header";
import ProductList from "../components/product/productList";


export default function New(props) {
  
 
  return (
    <main className=" min-h-screen ">
      <Header />

        {/* <h2 className="mt-10 font-bold    flex items-center justify-center text-2xl">New Arrival</h2>  */}
      <ProductList products={props.data.data}  />
    </main>
  );
}

export async function getServerSideProps(context) {
 

  const res = await fetch(
    `http://localhost:3000/api/product?newp=true`,
    {
      // next: { revalidate: 10 },
      method: "GET",
      mode: "cors",
    }
  );

  // console.log("in wishlist", res);
  const data = await res.json();
  return { props: { data } };
}
