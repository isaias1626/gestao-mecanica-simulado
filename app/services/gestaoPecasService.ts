import { Peca } from "../dashboard/gestao-de-pecas/page";

const LOCAL_STORAGE_KEY = 'pecas';

export const gestaoPecasService = {
    ConsultarPeca: (): Peca[] => {
        const pecasFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
        return pecasFromStorage ? JSON.parse(pecasFromStorage) : [];
    },

    CriarPeca: (novaPeca: Peca) => {
        const pecas = gestaoPecasService.ConsultarPeca();
        pecas.push(novaPeca);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pecas));
    },

    EditarPeca: (pecaAtualizada: Peca) => {
        let pecas = gestaoPecasService.ConsultarPeca();
        const index = pecas.findIndex((peca) => peca.id === pecaAtualizada.id);
        if (index !== -1) {
            pecas[index] = pecaAtualizada;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pecas));
        }
    },

    DeletarPeca: (pecaDeletada: Peca) => {
        let pecas = gestaoPecasService.ConsultarPeca();
        pecas = pecas.filter((peca) => peca.id !== pecaDeletada.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pecas));
    },

};