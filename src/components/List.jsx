import {
  Box,
  Image,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash, FaThList } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { api } from "../axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FormInput, FormButton } from "./FormComponents";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { formSchema } from "./schemas";
const getList = async () => {
  try {
    const itemsApi = await api.get("/teste-front");
    return itemsApi.data;
  } catch (error) {
    const err = error;
    console.log(err.response);
  }
};

const DeleteItem = async (id) => {
  const itemsApi = await api
    .delete(`/teste-front/${id}`)
    .then((resolve) => {
      const { message } = resolve.data;
      return message;
    })
    .catch((error) => {
      const { message } = error.response.data;
      return message;
    });
  return (
    itemsApi.data,
    toast(itemsApi, {
      position: toast.POSITION.TOP_CENTER,
    })
  );
};

const editItem = async (data) => {
  console.log("editItem:", data);
  const itemsApi = await api
    .patch(`/teste-front/${data.id}`, data)
    .then((resolve) => {
      const { message } = resolve.data;
      return message;
    })
    .catch((error) => {
      const { message } = error.response.data;
      return message;
    });
  return toast(itemsApi, {
    position: toast.POSITION.TOP_CENTER,
  });
};

// export const handleError = (error) => {
//   console.log(error);
// };

export default function List() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [items, setItems] = useState();
  const handleSearch = async () => {
    setItems(await getList());
  };
  useEffect(() => {
    handleSearch();
    setInterval(() => {
      handleSearch();
    }, 20000);
  }, []);

  const [id, setId] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");
  const [nome, setNome] = useState("");
  const [valorVenda, setValorVenda] = useState(0);
  const [referencia, setReferencia] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [estoque, setEstoque] = useState(0);

  const handleUpdate = (data) => {
    console.log("teste:", data.id, data);
    editItem(data);
    onEditClose();
  };

  const handleDelete = () => {
    console.log("handleDelete: ");
    DeleteItem(id);
    onDeleteClose();
  };

  const handleSetDelete = (item) => {
    setId(item.id);
    setImagemProduto(item.imagemProduto);
    setNome(item.nome);
    setValorVenda(item.valorVenda);
    setReferencia(item.referencia);
    setUnidadeMedida(item.unidadeMedida);
    setFabricante(item.fabricante);
    setEstoque(item.estoque);

    onDeleteOpen();
  };

  const handleSetRegister = (item) => {
    console.log(item);
    setValue("id", item.id);
    setValue("imagemProduto", item.imagemProduto);
    setValue("nome", item.nome);
    setValue("valorVenda", item.valorVenda);
    setValue("referencia", item.referencia);
    setValue("unidadeMedida", item.unidadeMedida);
    setValue("fabricante", item.fabricante);
    setValue("estoque", item.estoque);

    onEditOpen();
  };

  return (
    <Box border="1px solid #A0AEC0" mt="2rem" borderRadius="md">
      <Table>
        <Thead>
          <Tr>
            <Th> Imagem </Th>
            <Th> Nome do produto </Th>
            <Th> Referência </Th>
            <Th> Valor de venda </Th>
            <Th> Fabricante </Th>
            <Th> Estoque </Th>
            <Th>
              <Button>
                {" "}
                <Icon as={FaThList}> </Icon>
              </Button>
              <Button>
                <Icon as={BsGrid1X2Fill}> </Icon>
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => {
            return (
              <Tr
                borderRadius="md"
                bgColor="#E2E8F0"
                _hover={{
                  background: "#B8D6FF",
                }}
                px="1rem"
                py=".5rem"
              >
                <Td>
                  <Image
                    src={item.imagemProduto}
                    boxSize="100px"
                    objectFit="cover"
                  />
                </Td>
                <Td>{item.nome}</Td>
                <Td>{item.referencia}</Td>
                <Td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.valorVenda)}
                </Td>
                <Td>{item.fabricante}</Td>
                <Td>{`${item.estoque} ${item.unidadeMedida}`}</Td>
                <Td>
                  <Button
                    bg="transparent"
                    onClick={() => handleSetRegister(item)}
                  >
                    <Icon
                      as={RiPencilFill}
                      w="3rem"
                      h="2rem"
                      bgColor="blue.500"
                      color="white"
                      px=".1rem"
                      py=".2rem"
                      borderRadius="md"
                      mx=".1rem"
                    />
                  </Button>
                  <Button
                    bg="transparent"
                    onClick={() => handleSetDelete(item)}
                  >
                    <Icon
                      as={FaTrash}
                      w="3rem"
                      h="2rem"
                      bgColor="red.500"
                      color="white"
                      px=".1rem"
                      py=".2rem"
                      borderRadius="md"
                      mx=".1rem"
                    />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Edite o produto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(handleUpdate)}>
                <FormInput
                  label="Nome"
                  register={register}
                  name="nome"
                  message={errors?.nome?.message}
                />

                <FormInput
                  label="Valor de venda"
                  name="valorVenda"
                  type="number"
                  step="any"
                  register={register}
                  message={errors?.valorVenda?.message}
                />

                <FormInput
                  label="Referência"
                  name="referencia"
                  register={register}
                  message={errors?.referencia?.message}
                />

                <FormInput
                  label="Unidade de medida"
                  name="unidadeMedida"
                  register={register}
                  message={errors?.unidadeMedida?.message}
                />

                <FormInput
                  label="Fabricante"
                  name="fabricante"
                  register={register}
                  message={errors?.fabricante?.message}
                />

                <FormInput
                  label="Estoque"
                  name="estoque"
                  type="number"
                  step="any"
                  register={register}
                  message={errors?.estoque?.message}
                />

                <FormInput
                  label="Imagem do Produto"
                  name="imagemProduto"
                  type="number"
                  register={register}
                  message={errors?.imagemProduto?.message}
                />

                <ModalFooter>
                  <FormButton type="submit" bgColor="#38A169" label="Editar" />
                  <FormButton
                    onClick={onEditClose}
                    bgColor="#E53E3E"
                    label="Cancelar"
                  />
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Deletar o produto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Deletar realmente deletar {nome}?</Text>
              <ModalFooter>
                <FormButton
                  onClick={handleDelete}
                  bgColor="#38A169"
                  label="Deletar"
                />
                <FormButton
                  onClick={onDeleteClose}
                  bgColor="#E53E3E"
                  label="Cancelar"
                />
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
}
