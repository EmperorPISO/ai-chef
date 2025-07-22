import Header from '@components/Header'
import MainComponent from '@components/MainComponent'
import Footer from '@/components/Footer'



export default function App() {
return(
  <div className='flex-col flex-centered  min-h-screen'>
    <div>
      <div className=' flex-grow max-w-4xl w-full rounded-md bg-[#F2F3F2] min-h-[90vh] shadow-lg shadow-[#2d882d30]'>
      <Header />
      <MainComponent />
    </div>
    <Footer />
    </div>
  
  </div>
)
}
