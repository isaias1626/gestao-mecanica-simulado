"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Peca } from "../gestao-de-pecas/page";
import { gestaoPecasService } from "@/app/services/gestaoPecasService";

const HomePage = () => {
    const [peca, setPeca] = useState<Peca[]>([])
    const [filtroNome, setFiltroNome] = useState('');

    async function render() {
        try {
            const res = await gestaoPecasService.ConsultarPeca();
            setPeca(res || []);
            console.log(res);
        } catch (error) {
            console.error("Erro ao carregar peças:", error);
        }
    }

    useEffect(() => {
        render();
    }, []);

    const filterPecas = (pecas: Peca[]) => {
        const filtro = filtroNome.toLowerCase();
        return pecas.filter(peca => peca.nomePeca && peca.nomePeca.toLowerCase().includes(filtro));
    };

    return ( 
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de Peças Cadastradas</h1>
                    <Input
                        type="text"
                        placeholder="Pesquisar peças por nome..."
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                        className="w-64"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome da Peça</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número do Lote</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço de Custo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço de Venda</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade em Estoque</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filterPecas(peca).map(peca => (
                                <tr key={peca.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{peca.nomePeca}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{peca.numeroLote}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{peca.precoCusto}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{peca.precoVenda}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{peca.quantidadeEstoque}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
