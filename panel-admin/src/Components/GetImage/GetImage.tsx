"use client";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GetImageAdmin } from "../../type";
import { fetchApi } from "../Fetch/FetchApi";
type GetImageType = {
    setImage: (value: boolean) => void;
    setImg: (value: string) => void;
    showImage: boolean;
};
export default function GetImage({
    setImage,
    showImage,
    setImg,
}: GetImageType) {
    const [allImg, setAllImg] = useState<GetImageAdmin>();
    const getImage = async (id?: number) => {
        const data = await fetchApi({ url: `/upload${id ? "?page=" + id : ""}`, method: "GET" })
        if (data.error) return
        if (id && allImg?.rows) {
            setAllImg({
                ...allImg,
                pagination: data.json.data.pagination,
                rows: [...allImg?.rows, ...data.json.data.rows],
            });
            return;
        }
        setAllImg(data.json.data);
    };

    useEffect(() => {
        getImage();
    }, []);
    return (
        <>
            {showImage && (
                <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 bg-[#0c0c0ca8] -translate-y-1/2 w-full h-screen flex items-center justify-center">
                    <div className="flex flex-wrap gap-5 mt-10 w-1/2 bg-slate-700 p-3 rounded-md h-3/4 overflow-auto">
                        <div className="flex justify-between w-full">
                            <span>نمایش</span>
                            <span>
                                <i
                                    className="bg-gray-300 text-gray-950 px-3 rounded-md cursor-pointer py-1"
                                    onClick={() => setImage(false)}
                                >
                                    <AiOutlineClose className="inline text-xl" />
                                </i>
                            </span>
                        </div>
                        {allImg?.rows &&
                            allImg.rows.map((i,) => (
                                <div className="relative" key={i.id}>
                                    <div className="w-[300px] h-[250px] relative">
                                        <img
                                            onClick={() => setImg(`${process.env.NEXT_PUBLIC_URL}/${i.url}`)}
                                            src={`${process.env.VITE_PUBLIC_URL}/${i.url}`}
                                            alt="photo"
                                            className="rounded-md shadow-lg border border-gray-700 object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        <div className="w-full">
                            {Number(allImg?.pagination.allPage) !==
                                Number(allImg?.pagination?.nextPage) && allImg?.rows.length ? (
                                <button
                                    type="button"
                                    className="bg-blue-300 p-1 px-3 rounded-md mt-3"
                                    onClick={() => {
                                        if (allImg.pagination.nextPage) {
                                            getImage(allImg.pagination.nextPage);
                                        }
                                    }}
                                >
                                    نمایش بیشتر
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}