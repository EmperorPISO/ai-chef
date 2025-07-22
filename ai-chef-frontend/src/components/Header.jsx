import chefHat from '@/assets/chef_hat.png'


export default function Header() {
return (
    <div className='flex-centered gap-x-5 h-[80px] border-b-2 border-[#9D0004]'>
    <img src={chefHat} alt="chef_hat" className='min-w-header'/>
    <span className='font-merienda font-bold min-text-header text-[#002100]'>AI Chef</span>
    </div> 
)
}