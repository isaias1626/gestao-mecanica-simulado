"use client";

import React, { useState, useEffect } from 'react';
import { gestaoPecasService } from '@/app/services/gestaoPecasService';

export type Peca = {
    id: string;
    nomePeca: string;
    numeroLote: string;
    precoCusto: string;
    precoVenda: string;
    quantidadeEstoque: string;
};

const Pecas = () => {
    const [nomePeca, setNomePeca] = useState<string>('');
    const [numeroLote, setNumeroLote] = useState<string>('');
    const [precoCusto, setPrecoCusto] = useState<string>('');
    const [precoVenda, setPrecoVenda] = useState<string>('');
    const [quantidadeEstoque, setQuantidadeEstoque] = useState<string>('');
    const [pecas, setPecas] = useState<Peca[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        carregarPecasDoCache();
    }, []);

    const carregarPecasDoCache = () => {
        const pecasDoCache = gestaoPecasService.ConsultarPeca();
        setPecas(pecasDoCache);
    };

    const adicionarPeca = () => {
        const novaPeca: Peca = {
            id: editIndex !== null ? pecas[editIndex].id : String(Date.now()),
            nomePeca,
            numeroLote,
            precoCusto,
            precoVenda,
            quantidadeEstoque
        };

        if (editIndex !== null) {
            const pecasAtualizadas = [...pecas];
            pecasAtualizadas[editIndex] = novaPeca;
            setPecas(pecasAtualizadas);
            gestaoPecasService.EditarPeca(novaPeca);
            setEditIndex(null);
        } else {
            setPecas([...pecas, novaPeca]);
            gestaoPecasService.CriarPeca(novaPeca);
        }

        carregarPecasDoCache();
        limparCampos();
    };

    const deletarPeca = (index: number) => {
        const pecaDeletada = pecas[index];

        setPecas(pecas.filter((_, i) => i !== index));

        gestaoPecasService.DeletarPeca(pecaDeletada);

        carregarPecasDoCache();
    };

    const editarPeca = (index: number) => {
        const peca = pecas[index];
        setNomePeca(peca.nomePeca);
        setNumeroLote(peca.numeroLote);
        setPrecoCusto(peca.precoCusto);
        setPrecoVenda(peca.precoVenda);
        setQuantidadeEstoque(peca.quantidadeEstoque);
        setEditIndex(index);
    };

    const limparCampos = () => {
        setNomePeca('');
        setNumeroLote('');
        setPrecoCusto('');
        setPrecoVenda('');
        setQuantidadeEstoque('');
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Gestão de Estoque de Peças</h1>

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4">{editIndex !== null ? 'Editar Peça' : 'Adicionar Nova Peça'}</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome da Peça</label>
                        <input 
                            type="text" 
                            placeholder="Digite o nome da peça"
                            value={nomePeca}
                            onChange={(e) => setNomePeca(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Número do Lote</label>
                        <input 
                            type="text" 
                            placeholder="Digite o número do lote"
                            value={numeroLote}
                            onChange={(e) => setNumeroLote(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preço de Custo</label>
                            <input 
                                type="number" 
                                placeholder="Digite o preço de custo"
                                value={precoCusto}
                                onChange={(e) => setPrecoCusto(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preço de Venda</label>
                            <input 
                                type="number" 
                                placeholder="Digite o preço de venda"
                                value={precoVenda}
                                onChange={(e) => setPrecoVenda(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
                        <input 
                            type="number" 
                            placeholder="Digite a quantidade em estoque"
                            value={quantidadeEstoque}
                            onChange={(e) => setQuantidadeEstoque(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={adicionarPeca}
                    >
                        {editIndex !== null ? 'Salvar Alterações' : 'Adicionar Peça'}
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Lista de Peças</h2>
                    {pecas.map((peca, index) => (
                        <ul key={index}>
                            <li className="mb-4 p-4 border rounded-md" key={peca.id}>
                                <h3 className="text-xl font-bold">{peca.nomePeca}</h3>
                                <p><strong>Número do Lote:</strong> {peca.numeroLote}</p>
                                <p><strong>Preço de Custo:</strong> R${peca.precoCusto}</p>
                                <p><strong>Preço de Venda:</strong> R${peca.precoVenda}</p>
                                <p><strong>Quantidade em Estoque:</strong> {peca.quantidadeEstoque} unidades</p>
                                <div className="mt-4">
                                    <button 
                                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                                        onClick={() => editarPeca(index)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                        onClick={() => deletarPeca(index)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pecas;
