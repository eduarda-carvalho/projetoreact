import * as yup from "yup";

export const formSchema = yup.object().shape({
  nome: yup.string().required("*Campo obrigatório"),
  valorVenda: yup
    .number()
    .typeError("*Campo obrigatório")
    // .positive()
    .min(0, "O valor de venda tem que ser positivo")
    .required("*Campo obrigatório"),
  referencia: yup.string(),
  unidadeMedida: yup.string().required("*Campo obrigatório"),
  fabricante: yup.string(),
  estoque: yup
    .number()
    .positive()
    .typeError("*Campo obrigatório")
    .min(0)
    .required("*Campo obrigatório"),
  imagemProduto: yup.string(),
});
