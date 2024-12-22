import React from "react";

interface AlertProps {
  message: string;
}

export const AlertSuccess: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="fixed right-5 top-30 flex w-[350px] items-center justify-center gap-4 rounded-[6px] border-l-2 border-green bg-green-light-7 dark:bg-[#1B1B24] dark:bg-opacity-30 md:px-3 md:py-2">
      <div className="flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-green">
        <svg
          width="8"
          height="8"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
            fill="white"
            stroke="white"
          />
        </svg>
      </div>
      <div className="w-full">
        <h5 className="font-bold leading-[22px] text-[#004434] dark:text-[#34D399]">
          {message}
        </h5>
      </div>
    </div>
  );
};

export const AlertError: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="fixed right-5 top-30 flex w-[350px] items-center justify-center gap-4 rounded-[6px] border-l-2 border-red-light bg-red-light-5 dark:bg-[#1B1B24] dark:bg-opacity-30 md:px-3 md:py-2">
      <div className="flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-red-light">
        <svg
          width="8"
          height="8"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.79566 0.722904L1.7963 0.723542L5.49396 4.43004L9.20434 0.737509L9.55768 1.09128L9.20498 0.736873L9.20473 0.737119C9.50233 0.440303 9.97913 0.440433 10.2766 0.737509C10.5745 1.03505 10.5745 1.51262 10.2766 1.81016L10.2759 1.81079L6.56578 5.5031L10.262 9.2081C10.2621 9.2082 10.2622 9.20831 10.2623 9.20841C10.5599 9.50598 10.5597 9.98331 10.262 10.2807L9.90861 9.92698L10.2619 10.2807C10.1232 10.4193 9.92253 10.5 9.73314 10.5C9.54375 10.5 9.34309 10.4193 9.20434 10.2807L9.55768 9.92698L9.20434 10.2807L5.49333 6.57425L1.7963 10.2801L1.79566 10.2808C1.65691 10.4193 1.45624 10.5 1.26686 10.5C1.07746 10.5 0.876797 10.4193 0.738054 10.2808L1.09139 9.92698L0.73805 10.2807C0.440426 9.98348 0.440145 9.50654 0.737209 9.20894C0.737489 9.20866 0.737769 9.20838 0.73805 9.2081L4.4215 5.50246L0.723428 1.79555C0.723302 1.79543 0.723176 1.7953 0.72305 1.79518C0.425523 1.49761 0.425649 1.02032 0.723428 0.722905C1.021 0.425698 1.49809 0.425698 1.79566 0.722904Z"
            fill="white"
            stroke="white"
          />
        </svg>
      </div>
      <div className="w-full">
        <h5 className="font-bold leading-[22px] text-[#BC1C21]">{message}</h5>
      </div>
    </div>
  );
};
