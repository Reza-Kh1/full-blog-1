import img from "../../../public/image.png";
import { PostBoxType } from "../../type";
import { Link } from "react-router-dom";
export default function PostBox(props: PostBoxType) {
  return (
    <div className=" w-3/12 post-box p-2">
      <div className="bg-slate-300 rounded-md p-3">
        <span className="flex justify-center">{props?.description}</span>
        <figure className="text-center my-3 mt-2">
          <Link to={props?.slug}>
            <img
              width={250}
              height={250}
              src={props?.imgSrc ? props?.imgSrc : img}
              alt={props?.imgAlt ? props?.imgAlt : ""}
              className="rounded-lg shadow-md"
            />
          </Link>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-700">{props?.user?.name}</span>
            <span className="text-sm text-gray-700">
              {props?.updatedAt
                ? new Date(props.updatedAt).toLocaleDateString("fa")
                : ""}
            </span>
          </div>
        </figure>
        <div>
          <p>{props?.description}</p>
          <Link
            to={props?.slug}
            className="bg-blue-400 shadow-md py-1 text-gray-50 px-4 rounded-lg transition-all mt-3 shadow-gray-400 hover:bg-blue-500"
          >
            ادامه مقاله
          </Link>
        </div>
      </div>
    </div>
  );
}
