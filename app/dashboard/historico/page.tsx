
import React from 'react';

const Manutencoes = () => {
    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Histórico de Manutenções</h1>
                
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4">Filtrar Manutenções</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Período (De)</label>
                        <input 
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Período (Até)</label>
                        <input 
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Veículo</label>
                        <input 
                        type="text"
                        placeholder="Digite o veículo"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    </div>
                    <button 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4"
                    >
                    Filtrar
                    </button>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Lista de Manutenções</h2>
                    <ul>
                    <li className="mb-4 p-4 border rounded-md">
                        <h3 className="text-xl font-bold">Data da Manutenção: 01/06/2024</h3>
                        <p><strong>Veículo:</strong> Ford Fiesta</p>
                        <p><strong>Serviços Realizados:</strong></p>
                        <ul className="list-disc ml-6">
                        <li>Troca de óleo</li>
                        <li>Alinhamento e balanceamento</li>
                        </ul>
                        <p><strong>Peças Substituídas:</strong></p>
                        <ul className="list-disc ml-6">
                        <li>Óleo do motor</li>
                        <li>Filtro de óleo</li>
                        </ul>
                        <p><strong>Custo Total:</strong> R$300,00</p>
                        <div className="mt-4">
                        <button 
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2"
                        >
                            Detalhes
                        </button>
                        <button 
                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                        >
                            Excluir
                        </button>
                        </div>
                    </li>
                    </ul>
                </div>
        </div>
        </div>
    );
};

export default Manutencoes;
