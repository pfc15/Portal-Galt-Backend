import ButtonGalt from "@/components/button";
import InputGalt from "@/components/input";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src='../assets/Galt.png'
              className="w-32 mx-auto" />
          </div>
          <div className="mt-12 flex flex-col items-center font-museo">
            <h1 className="text-2xl xl:text-5xl text-main_color font-bold">
              Bem vindo ao Portal Galt!
            </h1>
            <div className="w-full flex-1">
              <div className="my-12 border-b text-center">
              </div>
              <div className="mx-auto max-w-xs">
                <InputGalt type="Email" placeholder="Email" />
                <InputGalt type="PassWord" placeholder="Senha" />
                <ButtonGalt text="Entrar" svg="user" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center hidden lg:flex">
          <img src='../assets/imagemlogin.png'/>
        </div>
      </div>
    </div>
  );
}