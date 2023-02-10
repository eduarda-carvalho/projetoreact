import React from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../axios";
import { FormButton, FormInput } from "./FormComponents";
import { formSchema } from "./schemas";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  // const nome= watch('valorVenda')
  // useEffect(() => {
  //   console.log('nome:',nome)
  // }, [nome])

  const limparCampos = () => {
    console.log("limpei");
    reset();
  };
  const submitItem = async (data) => {
    console.log(data);
    data.estoque = Number(data.estoque);
    data.valorVenda = Number(data.valorVenda);
    const response = await api
      .post("/teste-front", data)
      .then((resolve) => {
        const { message } = resolve.data;
        return message;
      })
      .catch((error) => {
        const { message } = error.response.data;
        return message;
      });

    reset();

    toast(response, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitItem)}>
      <SimpleGrid
        columns={[1, 1, 3, null, 3, null, 3]}
        spacing="4"
        w="100%"
        border="1px solid #A0AEC0"
        p="0.5rem"
        borderRadius="md"
      >
        <FormInput
          label="Nome"
          register={register}
          name="nome"
          message={errors?.nome?.message}
        />
        <FormInput
          label="Valor de venda"
          register={register}
          type="number"
          step="any"
          name="valorVenda"
          message={errors?.valorVenda?.message}
        />
        <FormInput
          label="Referência"
          register={register}
          name="referencia"
          message={errors?.referencia?.message}
        />
        <FormInput
          label="Unidade de medida"
          register={register}
          name="unidadeMedida"
          message={errors?.unidadeMedida?.message}
        />
        <FormInput
          label="Fabricante"
          register={register}
          name="fabricante"
          message={errors?.fabricante?.message}
        />
        <FormInput
          label="Estoque"
          type="number"
          step="any"
          register={register}
          name="estoque"
          message={errors?.estoque?.message}
        />
        <FormInput
          label="Imagem do produto"
          bgColor="white"
          register={register}
          name="imagemProduto"
          message={errors?.imagemProduto?.message}
        />
        <Box></Box>
        <Flex justifyContent="flex-end" alignItems="flex-end" mr="2rem">
          <FormButton
            label="Limpar campos"
            onClick={limparCampos}
            bgColor="#E53E3E"
          />
          <FormButton label="Salvar" bgColor="#38A169" type="submit" />
        </Flex>
      </SimpleGrid>
    </form>
  );
}
