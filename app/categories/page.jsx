import { BackButton } from "@components/index";


const CategoriesPage = () => {
  return (
    <div className="flex flex-col h-svh">
      <header className="w-full bg-slate-400 h-16 flex justify-between items-center px-4">
        <BackButton />
      </header>
      <main className="w-full bg-slate-300 h-svh-4rem overflow-y-scroll">
        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-48 bg-amber-200 rounded-md"></div>
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
