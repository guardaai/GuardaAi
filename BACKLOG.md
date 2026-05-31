# 🦔 GuardaAí — Backlog Mestre

> Lista-fonte-da-verdade de tudo que falta e de todas as ideias.
> Ninguém depende de memória: o que estiver aqui, existe.
> Atualizado: 31/05/2026

---

## ✅ JÁ FEITO E NO AR (referência)
- Central de Faturas (cartão de crédito, ciclo de fatura)
- Dívida de juros / agiota completa (bola de neve, repor janela) — dividas v9
- Meta do Tatu (plano de quitação, 4 cenários, barra viva) — metas v3
- Relatórios 360° (entra vs sai, categoria, conta, insight) — relatorios v1
- Tatu Chat (assessor voz + texto, retrato financeiro completo) — chat.html
- Home religada (atalhos + links corrigidos)

---

## 🔧 PENDÊNCIAS TÉCNICAS (curtas)
1. **Voz-IA premium no Tatu Chat** — voz nativa é robótica. Trocar por ElevenLabs/OpenAI TTS quando tiver usuário pagando (custa, mexe na Edge Function).
2. **Separar cartões de crédito em aba própria** (contas.html) — hoje misturado na aba Contas.
3. **Espalhar polish.js** nas telas que faltam: setup, index, dashboard, patrimonio, educacao. (chat/contas/dividas/metas/home/transacoes/relatorios já têm.)
4. **Estado "pago" visual** — conta paga muda de cor (verde/apagada) + selo "PAGO em DD/MM" e CONTINUA visível (não some). Hoje some e gera dúvida.
5. **Meta do Tatu no fim do setup** (passo 9 / P9).
6. **Barra de progresso no cenário de dívida normal** (hoje só o agiota tem barra viva).

## 🐞 BUG CONHECIDO — MOEDA ESTRANGEIRA (dólar / Nomad)
7. **Banco em dólar cadastra errado.** No setup/cadastro de conta, banco tipo **Nomad / Wise** tem saldo em **USD**, mas o sistema grava o número como se fosse **R$ (BRL)**, sem conversão. Resultado: patrimônio fica errado (mistura real e dólar).
   - **Decisão tomada:** multi-moeda COMPLETO (cotação automática, conversão em toda tela) é caro/complexo e NÃO é prioridade de MVP — público inicial é brasileiro em real; nômade digital é nicho pequeno por ora.
   - **Meio-termo barato (quando for mexer):** ao escolher banco em moeda estrangeira, o sistema (a) avisa "esse banco é em dólar — cadastre o valor já convertido pra real", OU (b) guarda a moeda e mostra "US$" naquela conta sem somar no patrimônio em real. Evita a confusão sem fazer a obra de conversão.

---

## 🚀 FEATURES GRANDES (ainda não feitas)
8. **IA análise completa de fotos** — extração máxima de qualquer foto (fatura, cupom, boleto, contrato, print negociação). "Você manda a foto, Tatu faz o resto."
9. **Áudio IA pra parcelamentos + financiamentos** — ex: "carro 140k entrada + 24x de 2500" → gera entrada + dívida + parcelas previstas usando ciclo do cartão.
10. **Revisão geral de navegação** do app.

---

## 🌍 VISÃO FUTURA (pós-MVP)
11. **Marketplace de consultores financeiros** (cadastro, videochamada, comissão — modelo afiliação).
12. **Integrações:** Serasa (dívidas/score/negociar), Detran (IPVA/multas via placa), Receita (IR), prefeituras (IPTU), SPC, bancos (Open Finance/Pix), lojas (Casas Bahia/Magalu/Americanas), concessionárias (luz/água/gás), planos de saúde, escolas.
13. **Pagar/parcelar/negociar dívidas DENTRO do app** (modelo Serasa Limpa Nome + além).
14. **Gestor de vida financeira completo** — registra carro, imóvel; parcerias Webmotors/iCarros; simula financiamento.
15. **App oficial do brasileiro** — vendido pra governo federal/estadual/municipal + integração Receita (IR automático).

---

## 🧭 SETUP (decisão)
- Setup fica por ÚLTIMO, salvo se alguma feature exigir campo novo nele.
- Itens que tocam o setup: nº5 (Meta do Tatu no fim), nº7 (aviso de moeda estrangeira no cadastro de conta).

---

## 🚫 PROJETO SEPARADO (NUNCA misturar com GuardaAí)
16. **Fitness / iFood** — plataforma que conecta cardápio do nutri a auto-pedido (iFood/UberEats) + marketplace (academias, suplementos, roupa fitness, eventos). Sessão própria, dedicada, no futuro.

---

### Como usar este arquivo
- Toda ideia nova entra AQUI primeiro (não confiar na memória do chat).
- Quando algo for feito, move pra seção "✅ JÁ FEITO".
- Quando começar uma sessão, abrir este arquivo pra lembrar o que falta.
