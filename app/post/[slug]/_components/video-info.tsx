import React from 'react'
import { PostModel } from '@/types/models'
import LinkPlayer from "@/components/ui/link-player";
import { convertLongDate } from '@/lib/utils';
export default function VideoInfo({ currentPost, className, children }: { currentPost: PostModel, className: string, children: React.ReactNode }) {

    function popTags(text: string) {
        if (!text) return
        const array = text.split(",");
        return <>{array.map((item, index) => <span key={index} className='text-[13px] rounded px-2 py-1 ml-1  border tracking-wide'>{item}</span>)}</>
    }
    return (
        <div className={`w-full border-b border-white/40 ${className}`}>
            <div className="w-full">
                <LinkPlayer url={currentPost.url as string} platform={currentPost.platform as string} />
                <div className='w-full relative  text-white flex flex-col md:flex-row md:pt-5  md:pb-6 py-4 px-4 '>
                    <div className="md:pr-12 border-b md:border-b-0 md:border-r pb-6 md:pb-0 border-white/40 flex flex-col justify-center">
                        <div>
                            <h1 className="md:text-3xl text-xl font-bold inter-bold relative">{currentPost.title}</h1>
                            <div className="flex gap-2 items-center md:mt-2">
                                <div className="text-[11px] md:my-2 my-1 px-2 py-1 bg-linear-to-br font-semibold from-[#00aeef] to-[#004a95] rounded poppins-semibold w-fit">
                                    {currentPost.post_program.title}
                                </div>
                                <div className="text-[13px] font-semibold ">{convertLongDate(currentPost?.date_published as string)}</div>
                            </div>
                            {currentPost?.guest && <p className="text-[12px]">with {currentPost?.guest}</p>}

                            <div
                                className="text-justify poppins-light md:text-[15px] text-[13px]   bg-transparent text-white "
                                dangerouslySetInnerHTML={{
                                    __html: currentPost?.content ?? "",
                                }}
                            />
                            <p className='text-sm poppins-semibold mt-6 mb-2 flex gap-2 flex-wrap'>{popTags(currentPost?.tags as string)}</p>
                        </div>

                    </div>
                    <div className="md:w-180 lg:w-110 md:px-6 px-4 py-4 md:py-0 flex justify-center flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
