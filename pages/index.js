import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Promo from '../components/promo'
import ProductList from '../components/product/productList'

export default function Home(props) {

  console.log(props);
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Header/>
        <Promo/>
        <ProductList products={props.data.data}/>
       
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/product");

  console.log("sdsdsdsdd");
  const data = await res.json();
  return { props: { data } };
}
