import Link from "next/link";
import TableAllPromo from "../Tables/TableAllPromo";

const PromoBoxDetails = () => {
  return (
    <>
      <TableAllPromo />
      {/* <div className="flex justify-end">
        <Link
          href="promo-create"
          className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div> */}
    </>
  );
};

export default PromoBoxDetails;
