export default function Footer() {
   const URL = "https://www.linkedin.com/in/prince-okechukwu-30b46a2b9"
    return(
        <footer className="flex-centered w-3xl h-14 text-[#550000] bg-[#cbe8cb]">
            <p className="text-md ">&copy; 2025 PISO-CODES. All rights reserved. | Connect with me on <a 
            href={URL}
            target="_blank"
            rel="noopener noreferer"
            className="text-md">linkedin</a></p>
            
            

        </footer>
    )
}