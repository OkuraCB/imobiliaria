Pessoa(<u>CPF</u>, nome)

Proprietario(<u>_CPF_</u>, estadoCivil,)

TelefoneProprietario(<u>_CPF_, numFone</u>)

Certidao(<u>numero</u>, dataReg, _Proprietario_)

Inquilino(<u>_CPF_</u>, profissao, renda)

Fiador(<u>_CPF_</u>, renda)

Corretor(<u>_CPF_</u>, creci, inicio, comissao)

Imovel(<u>codigo</u>, endereco, numeroComodos, vagasGaragem, areaConstruida, dataCadastro, aluguel, _Proprietario_, _Corretor_\*)

Visita(<u>codigo</u>, dataVisita, _Inquilino_, _Imovel_)

Proposta(<u>_Inquilino_, _Imovel_</u>, dataProposta, valor)

Contrato(<u>_Imovel_, _Inquilino_</u>)
