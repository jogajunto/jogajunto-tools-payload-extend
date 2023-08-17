## jogajunto-tools-payload-extend

Esta biblioteca foi desenvolvida para auxiliar na extensão e personalização das funcionalidades padrão do Payload CMS. Com ela, você pode facilmente interagir com serviços externos, como Discord e GitHub, além de formatar e processar dados específicos.

### Como usar

#### Instalação

```bash
npm install jogajunto-tools-payload-extend
```

#### Configuração de variáveis de ambiente

Certifique-se de definir as seguintes variáveis de ambiente:

- DISCORD_CHAT_APP_NAME: Nome da sua aplicação para ser usado no Discord.
- DISCORD_CODENZBOT_WEBHOOK: URL do webhook do Discord.
- GITHUB_TOKEN: Token de acesso pessoal do GitHub.
- REPOSITORY_DISPATCH_URL: URL do repositório para disparar ações.

### Tipos

Este pacote fornece vários tipos de TypeScript para ajudá-lo a tipar seus dados:

- ClientPayload: Payload principal enviado pelo cliente.
- CollectionName: Nome das coleções no seu CMS.
- DiscordDataError e DiscordDataInfo: Formatos de dados para envio ao Discord.
- EmailHTMLCTA e EmailHTMLData: Estrutura dos dados de email.
- GitData: Dados específicos para a integração do GitHub.
- UserType: Tipo básico de usuário.

### Hooks e Fields

O jogajunto-tools-payload-extend também fornece utilitários para criar hooks e fields no Payload CMS. Estes são essenciais para estender e personalizar o comportamento padrão do CMS.

#### formatSlug

A função formatSlug permite criar slugs automaticamente com base em campos específicos. Ela também se encarrega de remover acentos e caracteres especiais.

Uso:

```typescript
import formatSlug from 'jogajunto-tools-payload-extend/src/utilities/formatSlug';

const slugField = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  hooks: {
    beforeChange: [formatSlug('title')],
  },
};
```

Neste exemplo, sempre que um valor para o campo title for fornecido ou modificado, o hook irá gerar e/ou modificar o slug correspondente automaticamente.

#### Outros Hooks e Fields

Estamos constantemente expandindo e adicionando novas utilidades ao pacote. Certifique-se de verificar regularmente a documentação ou o código fonte para novas atualizações.

### Utilidades

#### Discord

- sendErrorDisc(data: DiscordDataError): Envia uma mensagem de erro para o Discord.
- sendInfoDisc(data: DiscordDataInfo): Envia uma mensagem informativa para o Discord.

#### GitHub

- sendAction(data: GitData): Dispara uma ação no GitHub, seja para criar um issue, PR, ou qualquer outra automação que você tenha configurado.

#### Formatação

- formatMarkdown(doc, collectionName, payload, formatters): Formata um documento em Markdown.
- formatSlug(fallback): Formata e limpa um slug, removendo acentos e caracteres especiais.

### Documentação

https://jogajunto.github.io/jogajunto-tools-payload-extend/

### Contribuição

Para contribuir com este projeto, faça um fork e envie um pull request com suas alterações. Certifique-se de seguir as boas práticas e escrever testes quando necessário.
