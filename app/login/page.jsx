import { login } from "./actions";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

export default function LoginPage() {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen min-w-[100svw] overflow-hidden">
      <div className="flex flex-column items-center justify-center">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full bg-white py-8 px-5 sm:px-8 flex flex-col gap-2"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center">
              <div className="text-900 text-3xl font-medium mb-3">
                {"Hoşgeldiniz!"}
              </div>
              <span className="text-600 font-medium">
                {"Devam etmek için giriş yapın"}
              </span>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email1"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  {"E-posta"}
                </label>
                <InputText
                  id="email1"
                  type="email"
                  name="email"
                  required
                  placeholder="E-posta adresi"
                  className="w-full md:w-[30rem]"
                  inputClassName="w-full"
                  style={{ padding: "1rem" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password1"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  {"Şifre"}
                </label>
                <Password
                  inputId="password1"
                  type="password"
                  name="password"
                  toggleMask
                  // className="w-full"
                  inputClassName="w-full p-4"
                  required
                  feedback={false}
                  pt={{ iconField: { root: { className: "w-full" } } }}
                  placeholder="Şifre"
                />
              </div>
              <Button
                label="Giriş yap"
                type="submit"
                formAction={login}
                className="w-full p-3 text-xl"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
