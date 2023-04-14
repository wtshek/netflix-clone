import { Input } from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Paths } from "@/utils/types";

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
  const isLogin = variant === VariantEnum.Login;
  const isRegister = variant === VariantEnum.Register;

  const toggleVariant = useCallback(() => {
    setVariant((curr) =>
      curr === VariantEnum.Login ? VariantEnum.Register : VariantEnum.Login
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: Paths.Profiles,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name: username,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, username, login]);

  const onGithubSignInClick = () => {
    signIn("github", { callbackUrl: Paths.Profiles });
  };
  const onGoogleSignInClick = () => {
    signIn("google", { callbackUrl: Paths.Profiles });
  };

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
              {isLogin ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {isRegister && (
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
            <button
              onClick={isLogin ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} onClick={onGoogleSignInClick} />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} onClick={onGithubSignInClick} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {isLogin
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {isLogin ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
