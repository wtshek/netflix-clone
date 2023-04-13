import { Input } from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 48;

enum VariantEnum {
  Login = "login",
  Register = "register",
}

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<VariantEnum>(VariantEnum.Login);

  const toggleVariant = useCallback(() => {
    setVariant((curr) =>
      curr === VariantEnum.Login ? VariantEnum.Register : VariantEnum.Login
    );
  }, []);

  const onValueChange =
    (cb: (str: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      cb(e.target.value);
    };
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="h-12"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant === VariantEnum.Login ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === VariantEnum.Register && (
                <Input
                  label="Username"
                  onChange={onValueChange(setUsername)}
                  id="username"
                  value={username}
                />
              )}

              <Input
                label="Email"
                onChange={onValueChange(setEmail)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={onValueChange(setPassword)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === VariantEnum.Login ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === VariantEnum.Login
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === VariantEnum.Login ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
