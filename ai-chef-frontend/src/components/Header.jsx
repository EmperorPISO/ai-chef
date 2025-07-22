import chefHat from '@/assets/chef_hat.png'


export default function Header() {
return (
    <div className='flex-centered gap-x-5 h-[80px] border-b-2 border-[#9D0004]'>
    <img src={chefHat} alt="chef_hat" className='w-[45px]'/>
    <span className='font-merienda font-bold text-[45px] text-[#002100]'>AI Chef</span>
    </div> 
)
}