"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const Minimal_1 = __importDefault(require("payload/dist/admin/components/templates/Minimal"));
const Button_1 = __importDefault(require("payload/dist/admin/components/elements/Button"));
const hooks_1 = require("payload/components/hooks");
const Config_1 = require("payload/dist/admin/components/utilities/Config");
const Meta_1 = __importDefault(require("payload/dist/admin/components/utilities/Meta"));
/**
 * View para importar dados em formato JSON para o Payload CMS.
 *
 * @param user - O usuário logado atualmente.
 * @param canAccessAdmin - Indica se o usuário tem acesso à área de administração.
 */
const ImportView = ({ user, canAccessAdmin }) => {
    // Hooks para obter configurações e definir etapas de navegação.
    const { routes: { admin: adminRoute }, } = (0, Config_1.useConfig)();
    const { setStepNav } = (0, hooks_1.useStepNav)();
    // Estado local para armazenar o arquivo JSON e feedback para o usuário.
    const [file, setFile] = (0, react_1.useState)(null);
    const [feedback, setFeedback] = (0, react_1.useState)(null);
    // Definindo a navegação para esta view.
    (0, react_1.useEffect)(() => {
        setStepNav([
            {
                label: 'Import JSON View',
            },
        ]);
    }, [setStepNav]);
    // Assegurando que um usuário não logado, não tenha acesso à view.
    const userRoles = user.roles;
    if (!user || (user && !canAccessAdmin) || userRoles.includes('editor')) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: `${adminRoute}/unauthorized` });
    }
    // Manipulador para capturar a seleção de arquivo.
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };
    // Manipulador para realizar a importação do JSON.
    const handleImport = async () => {
        // Configuração inicial do feedback.
        setFeedback({
            type: 'error',
            message: 'Nenhum arquivo selecionado!',
        });
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                // Leitura e envio dos dados JSON para o endpoint de importação.
                const jsonData = JSON.parse(event.target?.result);
                const response = await fetch('/import-payload-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                });
                const responseData = await response.json();
                // Configurando feedback baseado na resposta do servidor.
                if (response.ok) {
                    setFeedback({
                        type: 'success',
                        message: responseData.message ||
                            'Seus dados foram importados com sucesso!',
                    });
                }
                else {
                    setFeedback({
                        type: 'error',
                        message: responseData.message || 'Ocorreu um erro ao importar seus dados.',
                    });
                }
            }
            catch (error) {
                // Tratando erros ao ler ou processar o arquivo.
                let errorMessage = 'An unknown error occurred.';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                setFeedback({
                    type: 'error',
                    message: `Erro ao processar o arquivo JSON: ${new Error(errorMessage)}`,
                });
            }
        };
        reader.readAsText(file);
    };
    // Estilização dos componentes da View.
    const ImportViewContainer = (0, styled_components_1.default)(Minimal_1.default) `
    h1 {
      margin-bottom: 30px;
    }

    .upload-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;

      label {
        margin-bottom: 10px;
        font-weight: bold;
      }

      input[type='file'] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .button-section {
      display: flex;
      gap: 10px;
    }
  `;
    const FeedbackMessage = styled_components_1.default.p `
    margin: 20px 0;
    color: #fff;
    padding: 20px;

    &.success {
      background-color: green; // ou a cor que preferir para mensagens de sucesso
    }

    &.error {
      background-color: red;
    }
  `;
    return (react_1.default.createElement(ImportViewContainer, null,
        react_1.default.createElement(Meta_1.default, { title: 'Import JSON', description: 'Import your JSON data into Payload.', keywords: 'Import, JSON, Payload, CMS' }),
        react_1.default.createElement("h1", null, "Import JSON Route"),
        react_1.default.createElement("div", { className: 'upload-section' },
            react_1.default.createElement("label", null, "Select your JSON file to import:"),
            react_1.default.createElement("input", { type: 'file', accept: '.json', onChange: handleFileChange })),
        react_1.default.createElement("div", { className: 'button-section' },
            react_1.default.createElement(Button_1.default, { el: 'button', onClick: handleImport, buttonStyle: 'secondary' }, "Import"),
            react_1.default.createElement(Button_1.default, { el: 'link', to: `${adminRoute}`, buttonStyle: 'secondary' }, "Cancel")),
        feedback && (react_1.default.createElement(FeedbackMessage, { className: feedback.type }, feedback.message))));
};
exports.default = ImportView;
