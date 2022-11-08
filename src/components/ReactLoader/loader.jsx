import { ThreeDots } from "react-loader-spinner";

export default function ReactLoader() {
  return (
    <div className="flex justify-center mt-12">
      <ThreeDots visible={true} color="#00000059" height={70} width={70} />
    </div>
  );
}
