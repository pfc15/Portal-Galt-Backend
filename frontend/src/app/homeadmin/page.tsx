'use client';
import Header from "@/components/header";

export default function Home() {
    return (
        <main className="w-full h-full">
            <Header isadmin />
            <div className="flex w-full h-[80vh]">
                <div className="flex items-center justify-center w-[50%]">
                    <img src="/assets/homeImage.jpg" alt="undraw_education" className="w-full md:w-[80%] rounded-xl" />
                </div>
                <div className="w-[40%] items-center justify-center h-[54vh] pt-20 text-justify mr-[20px]">
                    <h1 className="text-main_color text-center font-wight-bold pb-10 text-7xl font-extrabold">
                        Bem-Vindo ao Galt!
                    </h1>
                    <h1 className="text-black font-wight-bold text-2xl">
                        O Galt é um cursinho voluntário criado em 2015 por 4 estudantes da Universidade de Brasília com objetivo de ser muito mais que um cursinho, mas um local de duplo impacto e uma instituição de empoderamento de jovens de baixa renda até o ensino superior.
                        Trabalhamos com anseios, sonhos e motivação em transformar a nossa comunidade e o Brasil por meio de oportunidades igualitárias e democráticas à educação superior e na promoção do voluntariado.
                    </h1>
                </div>
            </div>
        </main>
    );
}
