"use client";
import { useState } from "react";
import Header from "@/components/header";
import SimuladoDropdown from "@/components/simuladosDD";

const mockSimulados: Record<string, Record<string, boolean>> = {
    "Simulado 1": { q1: true, q2: false, q3: true, q4: false },
    "Simulado 2": { q1: false, q2: true, q3: false, q4: true },
};

export default function SimuladosAluno() {
    const [selectedSimulado, setSelectedSimulado] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex justify-center gap-4 mb-4">
                    <SimuladoDropdown simulados={mockSimulados} selectedSimulado={selectedSimulado} onSelect={setSelectedSimulado} />
                </div>
                <div className="space-y-6">
                    {(selectedSimulado ? [selectedSimulado] : Object.keys(mockSimulados)).map((simulado, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl text-black font-semibold">{simulado}</h2>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {Object.entries(mockSimulados[simulado]).map(([questao, acerto], idx) => (
                                    <div key={idx} className={`text-center text-black font-medium p-2 rounded-lg ${acerto ? 'bg-green-200' : 'bg-red-200'}`}>
                                        <p className="font-semibold">{questao.toUpperCase()}</p>
                                        <p className="text-lg font-bold">{acerto ? '✔️' : '❌'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}