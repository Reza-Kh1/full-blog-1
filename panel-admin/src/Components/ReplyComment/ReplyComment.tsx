import { useEffect } from "react";
import { CommentType, ReplyCommentType } from "../../pages/Review/Review"
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { fetchApi } from "../Fetch/FetchApi";
type ReplyType = {
    info: ReplyCommentType;
    setComments: (value: ReplyCommentType) => void;
    setAllComment: (Value: CommentType) => void;
    allComments: CommentType;
};
export default function ReplyComment({
    info,
    setComments,
    setAllComment,
    allComments,
}: ReplyType) {
    const actionFrom = async (form: FormData) => {
        const comment = form.get("comment");
        const reply = form.get("reply");
        if (reply) {
            const body = {
                reply: info.id,
                comment: reply,
            };
            const data = await fetchApi({ url: "/reviews/1", method: "POST", body: body })
            if (data.error) return
        }
        if (comment) {
            const body = {
                comment: comment !== info.comment ? comment : "",
                status: "true",
            };
            const data = await fetchApi({ url: `/reviews/${info.id}`, method: "PUT", body: body })
            if (data.error) return
        }
        const newComents = allComments.rows.filter((i) => {
            return i.id !== info.id;
        });
        setAllComment({
            ...allComments,
            count: allComments.count - 1,
            rows: newComents,
        });
        setComments({
            comment: null,
            id: null,
            user: { name: null, phone: null },
            status: false,
        });
        toast.success("عملیات انجام شد");
    };
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);
    return (
        <>
            <div className="fixed transform bg-[#000000b8] z-50 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center left-1/2 top-1/2">
                <div className="bg-gray-700 p-3 rounded-md w-6/12 h-3/4 overflow-auto">
                    <div className="mb-5">
                        <i
                            className="bg-gray-100 px-3 py-1 cursor-pointer rounded-md"
                            onClick={() => {
                                setComments({
                                    comment: null,
                                    id: null,
                                    user: { name: null, phone: null },
                                    status: false,
                                });
                            }}
                        >
                            <IoMdClose className="inline" />
                        </i>
                    </div>
                    <span className="text-gray-200 block mb-2">کامنت گزاشته شده</span>
                    <form action={actionFrom}>
                        <textarea
                            aria-label="Label Text"
                            rows={5}
                            defaultValue={info.comment ? info.comment : undefined}
                            name="comment"
                            className="w-full p-2 rounded-md"
                        />
                        <span className="mb-2 mt-5 text-gray-200 block">
                            پاسخ خود را وارد کنید
                        </span>
                        <textarea aria-label="label for the text" rows={5} name="reply" className="w-full p-2 rounded-md" />
                        <div>
                            <button type="submit" className="bg-blue-300 mt-5 mx-auto px-4 py-1 rounded-md">
                                ویرایش کاربر
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
