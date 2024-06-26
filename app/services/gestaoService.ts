import { Servicos } from "../dashboard/gestao-de-servicos/page";

const LOCAL_STORAGE_KEY = 'servicos';

export const gestaoService = {
    ConsultarServico: (): Servicos[] => {
        const pecasFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
        return pecasFromStorage ? JSON.parse(pecasFromStorage) : [];
    },

    CriarServico: (novoServico: Servicos) => {
        const pecas = gestaoService.ConsultarServico();
        pecas.push(novoServico);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pecas));
    },

    EditarServico: (servicoAtualizada: Servicos) => {
        let pecas = gestaoService.ConsultarServico();
        const index = pecas.findIndex((servico) => servico.id === servicoAtualizada.id);
        if (index !== -1) {
            pecas[index] = servicoAtualizada;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pecas));
        }
    },

    DeletarServico: (servicoDeletada: Servicos) => {
        let pecas = gestaoService.ConsultarServico();
        pecas = pecas.filter((servico) => servico.id !== servicoDeletada.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pecas));
    },

};