import Link from "next/link";
import TableGame from "../Tables/TableGame";

const GamesBox = () => {
  return (
    <>
      <TableGame />
      {/* <div className="flex justify-end">
        <Link
          href="games-create"
          className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div> */}
    </>
  );
};

export default GamesBox;
