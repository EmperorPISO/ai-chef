import Header from '@components/Header'
import MainComponent from '@components/MainComponent'
import Footer from '@/components/Footer'



export default function App() {
return(
  <div className='flex-col flex-centered min-h-screen'>
    <div className='max-w-3xl w-full px-5 rounded-md bg-[#F2F3F2] min-h-[90vh] pb-4 shadow-lg shadow-[#2d882d30]'>
      <Header />
      <MainComponent />
    </div>
    <Footer />
  </div>
)
}
