# ROMC Refine Calculator

Uma calculadora de refino para Ragnarok Online que permite calcular os custos totais para refinar equipamentos do nível +4 ao +15.

Projeto instanciado em: https://nevesb.github.io/romc-refine/

## 📋 Sobre o Projeto

Esta aplicação web foi desenvolvida para ajudar jogadores de Ragnarok Online a calcular os custos de refino de equipamentos. A calculadora considera os preços de Ori/Elu, equipamentos e zeny necessários para cada nível de refino.

## 🚀 Como Instalar e Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone git@github.com:nevesb/romc-refine.git
cd romc-refine
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em: `http://localhost:8080/romc-refine/`

### Build para Produção

Para gerar uma versão otimizada para produção:

```bash
npm run build
```

## 🧮 Como Funciona o Cálculo

### Tabela de Refino

A calculadora utiliza uma tabela fixa com os custos de refino do nível 4 ao 15:

| Nível | Ori/Elu | Equipamentos | Zeny |
|-------|---------|--------------|------|
| 4→5   | 5       | 1            | 100,000 |
| 5→6   | 10      | 2            | 220,000 |
| 6→7   | 15      | 3            | 470,000 |
| 7→8   | 25      | 4            | 910,000 |
| 8→9   | 50      | 6            | 1,630,000 |
| 9→10  | 80      | 10           | 2,740,000 |
| 10→11 | 135     | 22           | 5,250,000 |
| 11→12 | 225     | 30           | 9,000,000 |
| 12→13 | 375     | 45           | 14,500,000 |
| 13→14 | 600     | 69           | 24,500,000 |
| 14→15 | 900     | 98           | 42,000,000 |

### Cálculo dos Custos

1. **Preço do Item**: Valor unitário do equipamento que será usado como material
2. **Preço Ori/Elu**: Valor unitário do Ori ou Elu no servidor
3. **Nível Inicial e Final**: Define o range de refino desejado

O cálculo considera:
- Quantidade de Ori/Elu necessária × Preço unitário
- Quantidade de equipamentos necessários × Preço do item
- Custo fixo de zeny para cada nível
- **Custo total acumulado** para atingir o nível desejado

### Exemplo de Uso

Para refinar uma arma do +7 ao +10:
- Insira o preço do equipamento (ex: 1,000,000 zeny)
- Insira o preço do Ori/Elu (ex: 50,000 zeny)
- Selecione nível inicial: 7
- Selecione nível final: 10
- A calculadora mostrará o custo para cada nível e o total acumulado

## 🌐 Funcionalidades

- ✅ Cálculo de custos de refino por nível
- ✅ Suporte a múltiplos idiomas (Português/Inglês)
- ✅ Interface responsiva e moderna
- ✅ Cálculo automático em tempo real
- ✅ Exibição de custos individuais e acumulados

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para interface de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Ícones

## 📱 Interface

A aplicação possui uma interface limpa e intuitiva com:
- Formulário para inserção de preços
- Seletor de níveis de refino
- Tabela de resultados com custos detalhados
- Alternador de idiomas
- Design responsivo para desktop e mobile

## 🎯 Créditos

Desenvolvido por **Grimphos @ Classic Global**
