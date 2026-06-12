# Projeto 06: Observabilidade em Tempo de Execução e Depuração (Projeto Final)

Projeto final: construa e avalie um harness completo, depois execute ciclos de limpeza para verificar qualidade e facilidade de manutenção.

## Guia de Diretórios

| Diretório | Significado |
|------|------|
| `starter/` | **Ponto de partida**: código completo do produto, mas o harness foi intencionalmente enfraquecido (apenas um `AGENTS.md` básico, sem `feature_list.json`, handoff de sessão ou checklist de estado limpo). |
| `solution/` | **Implementação de referência**: harness máximo, com todos os arquivos de artefatos presentes, pontuações altas de qualidade da documentação, scripts de benchmark e scanners de limpeza. |

## Como Usar

```sh
cd starter
npm install
# Execute a aplicação e registre manualmente o comportamento com harness fraco.
# O starter intencionalmente não inclui benchmark.sh ou cleanup-scanner.sh.

cd ../solution
npm install
# Execute o mesmo benchmark com o harness completo
# Execute os ciclos de limpeza
# Compare as alterações de pontuação no quality-document.md

# Execute os testes de benchmark
./scripts/benchmark.sh

# Execute a verificação de limpeza
./scripts/cleanup-scanner.sh
```

## Contrato Exato da Tarefa

O Projeto 06 é uma comparação final entre um produto completo com uma superfície de
harness fraca e o mesmo produto fortalecido com artefatos completos de harness. Diferente
dos projetos anteriores, o starter já contém a maior parte das funcionalidades do produto.
A diferença está no sistema operacional ao redor do código.

| Área | Estado no Starter | Evidência da Solution |
|------|------|------|
| Comportamento do produto | Importação, indexação, QA, histórico, feedback e reset já existem em sua maioria | Mesmas funcionalidades mais validações mais fortes e evidências de persistência |
| Arquivos de harness | `AGENTS.md` básico, sem `feature_list.json`, sem `session-handoff.md`, sem checklist de estado limpo | `AGENTS.md`, `CLAUDE.md`, `feature_list.json`, `init.sh`, `session-handoff.md`, `clean-state-checklist.md` |
| Acompanhamento de qualidade | Apenas o `quality-document.md` inicial | `quality-document.md` com pontuação maior, `evaluator-rubric.md` |
| Benchmarking | Sem scripts de benchmark ou limpeza | `scripts/benchmark.sh`, `scripts/cleanup-scanner.sh`, `scripts/check-architecture.sh` |
| Documentação de confiabilidade | Documentação mínima | `docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, `docs/RELIABILITY.md` |

Não espere que o starter contenha os comandos de benchmark mostrados para a
solution. Para a execução com harness fraco, registre observações manuais de
baseline; para a execução da solution, utilize os scripts de benchmark e limpeza
versionados no repositório.

## Funcionalidades Cobertas

- Importar documentos
- Construir ou atualizar o índice
- Responder perguntas com citações
- Feedback em tempo de execução
- Estado do repositório legível e reiniciável

## Aulas Relacionadas

- [Aula 11: Por Que Observabilidade Pertence ao Harness](../../docs/pt-BR/lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md)
- [Aula 12: Por Que Toda Sessão Deve Deixar um Estado Limpo](../../docs/pt-BR/lectures/lecture-12-why-every-session-must-leave-a-clean-state/index.md)