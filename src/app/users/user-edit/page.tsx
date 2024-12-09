import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserEdit from "@/components/UserEdit";

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Foydalanuvchi Ma'lumotlari" />
        <UserEdit />
      </div>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
