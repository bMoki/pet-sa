## REQUISITOS FUNCIONAIS

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível remover um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG 


## REGRAS DE NEGÓCIO

- [x] O pet deve ter as seguintes informações: 
Nome, Sobre, Idade, Porte, Nível de energia, Ambiente,Nível de independência Fotos e Requisitos para adoção
- [x] A ORG deve ter as seguintes informações: Nome, Email, CEP, Endereço, WhatsApp e Senha
- [x] O Email da ORG deve ser único
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

#####Reminder
- O cep será buscado no frontend
- Se o cep ja existe referencia-lo se não criar
- O cadastro da org será um stepper perguntando primeiro o endereço (frontend)
