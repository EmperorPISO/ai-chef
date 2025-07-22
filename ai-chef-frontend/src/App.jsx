import Header from '@components/Header'
import MainComponent from '@components/MainComponent'
import Footer from '@/components/Footer'



export default function App() {
return(
  <div className='flex-col flex-centered w-full min-h-screen'>
    <div className='flex-grow max-w-3xl px-1 rounded-md bg-[#F2F3F2] min-h-[90vh] shadow-lg shadow-[#2d882d30]'>
      <Header />
      <MainComponent />
      <Footer />
    </div>
    
  </div>
)
}
