import React from 'react'
import { getProgramInfo } from '../hooks/program';
import { Metadata } from 'next';
import { stripHtml } from '@/lib/utils';
export const dynamic = "force-dynamic";
import ProgramCard from '../_components/program_card';
import FeaturedCard from '../_components/featured_card';
import ProgramRecentPosts from '../_components/program-recent-posts';
import SetBg from '@/components/set-bg';
type Props = {
    params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const data = await getProgramInfo(slug);
    const program = data?.program;

    if (!program) {
        return {
            title: "DOSTv",
            description: "program not found",
        };
    }

    const image = `/storage/images/program_images/thumbnails${program.image}`;

    return {
        metadataBase: new URL("https://dostv.ph"),
        title: program.title,
        description: stripHtml(program.description),
        keywords: [
            "DOSTv",
            "DOSTv Program",
            "DOST Philippines",
            "science Philippines",
            "technology Philippines",
            "innovation",
            "science for the people",
            "DOST programs",
            "Filipino science shows",
            stripHtml(program.description),
        ],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            title: program.title,
            description: stripHtml(program.description),
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: program.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: program.title,
            description: stripHtml(program.description),
            images: [image],
        },
        icons: {
            icon: "/storage/images/logos/logo.png",
        },
    };
}

export default async function ProgramPage({ params }: Props) {
    const { slug } = await params;
    const data = await getProgramInfo(slug);
    const program = data.program
    const featured = data.featured_post
    return (
        <div className="w-full lg:px-10 md:px-2  px-6 pt-16 md:pt-18 lg:pt-22 ">
            <SetBg thumbnail={`/storage/images/program_images/thumbnails/${program.image}`} />
            <div className='grid md:grid-cols-5  gap-4 items-start border-b border-white/40  pb-8'>
                <div className="lg:pr-15 md:p-6 py-4  md:col-span-3 border-0 md:border-r border-white/40">
                    <ProgramCard program={program} total={data.total} />
                </div>
                <div className='flex flex-col gap-2  md:px-2 lg:px-10 py-3 md:col-span-2'>
                    <FeaturedCard featured={featured} />
                </div>
            </div>
            <div className='w-full py-6 '>
                <ProgramRecentPosts code={program.code} className="px-4 md:px-0" />
            </div>
        </div>
    )
}
