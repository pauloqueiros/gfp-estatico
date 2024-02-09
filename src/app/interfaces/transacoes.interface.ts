interface TransacaoItem {
    check?: boolean;
    id_transacao: number;
    descricao: string;
    data_transacao: Date;
    valor: number;
    categoria: string;
    usuario: string;
    contato: string;
    indicador_pago: string;
    tipo_pagamento: string;
    cartao: string;
    tipo_despesa: string;
  }
  
export  interface TransacoesResponse {
    response: TransacaoItem[];
}