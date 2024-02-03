import { useFormStatus } from "react-dom";
type ButtonSubmit = {
  classs?: string;
  types?: "submit" | "reset" | "button" | undefined;
  value: string;
};
export default function SubmitButton({ classs, types, value }: ButtonSubmit) {
  const { pending } = useFormStatus();
  return (
    <>
      <button className={classs} type={types}>
        {pending ? "صبر کنید..." : value}
      </button>
    </>
  );
}
