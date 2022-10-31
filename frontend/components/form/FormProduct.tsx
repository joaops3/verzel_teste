import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, Col, Row, Button, Popover, OverlayTrigger, ProgressBar, Table, Image } from "react-bootstrap";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CarsInterface } from "../../interfaces/interfaces";
import InputMask from "react-input-mask";
import { useDropzone } from "react-dropzone";
import CarsService from "../../services/CarsService";
import CurrencyInput from "react-currency-input-field";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import { AiOutlineClose } from "react-icons/ai";
import { onlyNumbers, removeSpecialCharacters } from "../../helpers/helpers";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Props {
  operation: string;
  data?: CarsInterface;
}

interface IUploadedFiles {
  file: any;
  key: string;
  preview: string;
  name: string;
  readableSize: string;
  url: string;
  progress: number;
  error: string;
  uploaded: boolean;
}

const FormProduct: React.FC<Props> = ({ operation, data }) => {
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles[]>([]);
  const route = useRouter();
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<CarsInterface>({ defaultValues: data });

  const onDrop = useCallback((acceptedFiles: any) => {
    const newList = acceptedFiles.map((file: any) => ({
      file,
      key: uniqueId(),
      preview: URL.createObjectURL(file),
      name: file.name,
      readableSize: filesize(file.size),
      url: null,
    }));

    setUploadedFiles((prev) => [...prev, ...newList]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg", ".webp"],
    },
  });

  const updateFields = useCallback(() => {
    if (operation !== "edit") return;
    const { id } = route.query;
    CarsService()
      .getCarsId(id as string)
      .then((resp) => {
        setValue("name", resp.data.data.name);
        setValue("brand", resp.data.data.brand);
        setValue("model", resp.data.data.model);
        setValue("price", resp.data.data.price);
      })
      .catch((e) => {
        toast.error("ERROR");
      });
  }, [route.query]);

  const submit: SubmitHandler<CarsInterface> = (data) => {
    let cloneData = Object.assign({} as CarsInterface, data);

    cloneData.name = removeSpecialCharacters(cloneData.name);
    cloneData.brand = removeSpecialCharacters(cloneData.brand);
    cloneData.model = removeSpecialCharacters(cloneData.model);
    cloneData.price = onlyNumbers(`${data.price}`);
    cloneData.model = removeSpecialCharacters(cloneData.model);

    const formData = new FormData();
    formData.append("photo", uploadedFiles[0].file);
    formData.append("name", data.name);
    formData.append("model", cloneData.model);
    formData.append("brand", cloneData.brand);
    formData.append("price", cloneData.price);

    if (operation === "sign") {
      CarsService()
        .setCars(formData)
        .then((resp) => {
          toast.success("Carro cadastrado com sucesso");
          setValue("name", "");
          setValue("brand", "");
          setValue("model", "");
          setValue("price", "");
        })
        .catch((e) => {
          toast.error("ERROR");
        });
    } else if (operation === "edit") {
      const { id } = route.query;
      if (!id) return;
      CarsService()
        .updateCars(id as string, formData)
        .then((resp) => {
          toast.success("Carro atualizado com sucesso");
        })
        .catch((e) => {
          toast.error("ERROR");
        });
    }
  };

  const handleDelete = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.key != id));
  };

  useEffect(() => {
    updateFields();
  }, [updateFields]);

  return (
    <>
      <Container className="mt-5">
        <Form
          className="bg-login p-4"
          onSubmit={handleSubmit(submit)}
          //encType="multipart/form-data"
        >
          <Row>
            <Form.Group as={Col} md={6}>
              <Form.Group as={Col} md={12}>
                <Form.Label>Name</Form.Label>
                <Controller
                  control={control}
                  name={"name"}
                  render={({ field: { onChange, value } }) => (
                    <InputMask
                      id={"name"}
                      className={"input"}
                      type="text"
                      mask=""
                      placeholder="Nome"
                      value={value}
                      defaultValue={getValues("name")}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  )}
                  rules={{ required: "O nome é obrigatorio", maxLength: 50 }}
                />
                {errors?.name && <Form.Text className="errorsMessage">{errors?.name.message}</Form.Text>}
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Label>Fabricante</Form.Label>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputMask
                      type="brand"
                      mask="aaaaaaaaaa"
                      //maskChar={""}
                      className="input"
                      placeholder="Fabricante"
                      value={value}
                      defaultValue={getValues("brand")}
                      onChange={(e) => onChange(e)}
                    ></InputMask>
                  )}
                  rules={{ required: "O brand é obrigatorio", maxLength: 40 }}
                />
                {errors.brand && <Form.Text className="errorsMessage">{errors.brand?.message}</Form.Text>}
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Label>Ano de Fabricação</Form.Label>
                <Controller
                  control={control}
                  name={"model"}
                  render={({ field: { onChange, value } }) => (
                    <InputMask
                      id={"model"}
                      className={"input"}
                      type="text"
                      mask="9999"
                      //maskChar={""}
                      placeholder="Ano de fabricação"
                      value={value}
                      defaultValue={getValues("model")}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  )}
                  rules={{
                    required: "O ano de fabricação é obrigatorio",
                    maxLength: 50,
                  }}
                />
                {errors?.model && <Form.Text className="errorsMessage">{errors?.model.message}</Form.Text>}
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Label>Preço</Form.Label>
                <Controller
                  control={control}
                  name={"price"}
                  render={({ field: { onChange, value } }) => (
                    <CurrencyInput
                      id="amount"
                      name="amount"
                      placeholder="R$ 0.00"
                      className="input"
                      decimalSeparator={"."}
                      groupSeparator={","}
                      allowNegativeValue={false}
                      allowDecimals={true}
                      decimalsLimit={2}
                      decimalScale={2}
                      disableGroupSeparators={true}
                      prefix={"R$"}
                      value={value}
                      onValueChange={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                  rules={{ required: "O preço é obrigatorio", maxLength: 50 }}
                />
                {errors?.price && <Form.Text className="errorsMessage">{errors?.price.message}</Form.Text>}
              </Form.Group>
            </Form.Group>

            {/*-------------table-------------    */}
            <Form.Group as={Col} md={6} className={"mt-4"}>
              <Table>
                <tbody></tbody>
                {!!uploadedFiles.length &&
                  uploadedFiles.map((file, index) => (
                    <>
                      <tr key={index}>
                        {file.preview && (
                          <td>
                            <Image src={file.preview} width={50} height={50} style={{ borderRadius: "5px" }}></Image>
                          </td>
                        )}

                        {file.name && <td>{file.name}</td>}
                        {/* 
                  {!file.uploaded &&
                    !file.error &&(<ProgressBar now={100}></ProgressBar>)}
                     */}
                        <td onClick={(e) => handleDelete(file.key)}>
                          <AiOutlineClose size={40} style={{ cursor: "pointer" }}></AiOutlineClose>
                        </td>
                      </tr>
                    </>
                  ))}
              </Table>
            </Form.Group>
          </Row>

          <Row className="mt-5">
            <Form.Group as={Col} md={6}>
              <div {...getRootProps()} className="drag">
                <input {...getInputProps()} />
                {isDragActive ? <p>Arraste os arquivos</p> : <p>Click ou arraste os arquivos</p>}
              </div>
            </Form.Group>
          </Row>

          <div className="text-end mt-3">
            <Button type="submit">Salvar</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default FormProduct;
