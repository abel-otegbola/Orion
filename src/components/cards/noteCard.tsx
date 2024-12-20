import { INote } from "@/interface/note";
import Link from "next/link";

export default function ProductCard({ product }: { product: INote }) {

    return (
        <div className={`flex flex-col bg-white dark:bg-[#000]/[0.1] relative break-inside-avoid md:mb-4 mb-2 pb-4 `} data-aos="fade-up">
                <Link href={`/product?id=${product.id}`} className="block rounded-[10px] sm:h-[250px] h-[250px] bg-gray-500/[0.1] bg-cover bg-center" >
                </Link>
                
                <p className="text-[10px] opacity-[0.5] uppercase font-bold px-3 py-0 my-2">{product?.createdAt}</p>
                <a href={`/product?id=${product.id}`} className="block pb-4 px-3 leading-[130%] text-[12px] uppercase font-semibold">{product?.title}</a>
                
        </div>
    )
}