import cookie from "cookie";

export async function getServerSideProps(context) {
  // Cookie'dan access tokenni olish
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const accessToken = cookies.access_token || null;

  // Agar access token bo'lsa, asosiy sahifaga o'tkazamiz
  if (accessToken) {
    return {
      redirect: {
        destination: "/", // Boshqa sahifaga yo'naltirish
        permanent: false, // Yo'naltirish doimiy emas
      },
    };
  }

  // Agar access token yo'q bo'lsa, login sahifasiga yo'naltirish
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
