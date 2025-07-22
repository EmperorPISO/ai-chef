export default function Footer() {
   const URL = "https://www.linkedin.com/in/prince-okechukwu-30b46a2b9"
    return(
        <footer className=" flex flex-col sm:flex-row items-center justify-center gap-2 h-auto sm:h-14 text-[#550000] bg-[#cbe8cb] min-text px-4 py-2 rounded-b-md">
            <p className="text-center">&copy; 2025 PISO-CODES. All rights reserved. |</p>
            <p>Connect with me on <a 
            href={URL}
            target="_blank"
            rel="noopener noreferer"
            >linkedin</a></p>
        </footer>
    )
}