import Header from "../components/header";
import ProductList from "../components/product/productList";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Wishlist(props) {
  
 
  return (
    <main className=" min-h-screen ">
      <Header />

      <ProductList products={props.data.data}  wishlist={true}/>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("Session", session)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `http://localhost:3000/api/wishlist?email=${session.user.email}`,
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
