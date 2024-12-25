import { Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white dark:bg-dark">
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#ffba00"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      {/* <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent">
      </div> */}
    </div>
  );
};

export default Loader;
