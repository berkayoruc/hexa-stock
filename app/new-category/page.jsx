import { createCategory } from "./actions";
import { BackButton } from "../components";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const NewCategoryPage = () => {
  return (
    <div className="flex flex-col h-svh">
      <header className="w-full bg-slate-400 h-16 flex items-center px-4">
        <BackButton />
        <h1 className="absolute left-24 right-24 text-center font-medium">
          Kategori Ekle
        </h1>
      </header>
      <main className="w-full bg-slate-300 h-svh-4rem overflow-y-scroll">
        <form className="max-w-sm mx-auto flex flex-col gap-4">
          <FloatLabel className="mt-8">
            <InputText
              className="w-full"
              type="text"
              id="name"
              name="name"
              placeholder="Kategori adını girin"
              required
            />
            <label htmlFor="name">{"Kategori Adı"}</label>
          </FloatLabel>
          <Button
            className="w-full"
            label="Kategori Ekle"
            formAction={createCategory}
            type="submit"
          />
        </form>
      </main>
    </div>
  );
};

export default NewCategoryPage;
