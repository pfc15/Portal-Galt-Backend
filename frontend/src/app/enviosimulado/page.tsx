'use client';

import Header from "@/components/header";
import InputFile from "@/components/fileinput";
// import DateInput from "@/components/dateinput";
 
export default function EnvioSimulado() {
    return (
        <div>
            <Header />
            <InputFile />
            <InputFile label="Faça o upload das respostas dos alunos"/>
        </div>
    )
}