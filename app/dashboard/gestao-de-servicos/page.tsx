"use client";

import { useEffect, useState } from "react";
import { gestaoService } from "@/app/services/gestaoService";

export type Servicos = {
    id?: string,
    nameService: string,
    description: string,
    price: string,
    time: string,
}

const CadastroDeServiços = () => {
    const [nameService, setNameService] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [servicos, setServicos] = useState<Servicos[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        carregarServicosDoCache();
    }, []);

    const carregarServicosDoCache = () => {
        const pecasDoCache = gestaoService.ConsultarServico();
        setServicos(pecasDoCache);
    };

    const adicionarServico = () => {
        const novoServico: Servicos = {
            id: editIndex !== null ? servicos[editIndex].id : String(Date.now()),
            nameService,
            description,
            price,
            time,
        };

        if (editIndex !== null) {
            const servicosAtualizadas = [...servicos];
            servicosAtualizadas[editIndex] = novoServico;
            setServicos(servicosAtualizadas);
            gestaoService.EditarServico(novoServico);
            setEditIndex(null);
        } else {
            setServicos([...servicos, novoServico]);
            gestaoService.CriarServico(novoServico);
        }

        carregarServicosDoCache();
        limparCampos();
    };

    const deletarServico = (index: number) => {
        setServicos(servicos.filter((_, i) => i !== index));
        const servicosDeletada = servicos[index];

        setServicos(servicos.filter((_, i) => i !== index));

        gestaoService.DeletarServico(servicosDeletada);

        carregarServicosDoCache();
    };

    const editarServico = (index: number) => {
        const servico = servicos[index];
        setNameService(servico.nameService);
        setDescription(servico.description);
        setPrice(servico.price);
        setTime(servico.time);
        setEditIndex(index);
    };

    const limparCampos = () => {
        setNameService('');
        setDescription('');
        setPrice('');
        setTime('');
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Gestão de Serviços</h1>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4">{editIndex !== null ? 'Editar Serviço' : 'Adicionar Novo Serviço'}</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome do Serviço</label>
                        <input
                            onChange={(e) => setNameService(e.target.value)}
                            value={nameService}
                            type="text"
                            placeholder="Digite o nome do serviço"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Digite a descrição do serviço"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Preço</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            placeholder="Digite o preço do serviço"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Duração Estimada</label>
                        <input
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="time"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={adicionarServico}
                    >
                        {editIndex !== null ? 'Salvar Alterações' : 'Adicionar Serviço'}
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Lista de Serviços</h2>
                    <ul>
                        {servicos.map((servico, index) => (
                            <li key={index} className="mb-4 p-4 border rounded-md">
                                <h3 className="text-xl font-bold">{servico.nameService}</h3>
                                <p>{servico.description}</p>
                                <p><strong>Preço:</strong> {servico.price}</p>
                                <p><strong>Duração:</strong> {servico.time}</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => editarServico(index)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletarServico(index)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CadastroDeServiços;

