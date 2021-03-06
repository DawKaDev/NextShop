import Head from 'next/head'
import MainContainer from '../components/Main'

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainContainer>
        Strona główna
      </MainContainer>
    </div>
  )
}

export default HomePage;
