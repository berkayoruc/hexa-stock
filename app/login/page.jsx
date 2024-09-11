import { login } from "./actions";
import { Button } from "primereact/button";
// import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

export default function LoginPage() {
  return (
    <div className="p-4">
      <form className="max-w-sm mx-auto flex flex-col gap-4">
        {/* <FloatLabel> */}
        <InputText
          type="email"
          id="email"
          name="email"
          required
          className="w-full"
          placeholder="E-posta"
        />
        {/* <label htmlFor="email">E-posta</label> */}
        {/* </FloatLabel> */}
        {/* <FloatLabel> */}
        <Password
          type="password"
          id="password"
          name="password"
          required
          feedback={false}
          toggleMask
          inputClassName="w-full"
          pt={{ iconField: { root: { className: "w-full" } } }}
          placeholder="Şifre"
        />
        {/* <label htmlFor="password">Şifre</label> */}
        {/* </FloatLabel> */}
        <Button label="Giriş yap" type="submit" formAction={login}></Button>
      </form>
    </div>
  );
}
