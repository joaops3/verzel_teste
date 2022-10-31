import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UsersInterface } from "../../interfaces/interfaces";
import InputMask from "react-input-mask";
import { parseDate, formatDate } from "../../helpers/helpers";
import {useRouter} from "next/router"
import UserService from "../../services/UserService"
import {toast} from "react-toastify"

interface Props {
  operation: string;
  currentData?: UsersInterface;
  id?: string
}

const FormUser: React.FC<Props> = ({ operation, currentData, id }) => {
  const [data, setData] = useState<UsersInterface>(currentData ?? {} as UsersInterface);
  const [nascimento, setNascimento] = useState<Date | null>();
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [confirmationError, setConfirmationError] = useState<boolean>(false);
  const navigate: any = useRouter()

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<UsersInterface>({ defaultValues: data });

  const updateInfo = () => {
    if(currentData){
    
    setValue("name", currentData.name)
   
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Requisitos</Popover.Header>
      <Popover.Body>
        <ul>
          <li>A senha deve conter 1 Letra Maiúscula</li>
          <li>A senha deve conter 1 Letra Minúscula</li>
          <li>A senha deve conter 1 numero</li>
          <li>A senha deve conter 1 caractere especial</li>
          <li>A senha deve conter min 8 e max 20 caracteres</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const submit: SubmitHandler<UsersInterface> = async (data) => {
    let dataClone = Object.assign({}, data)
    
    if(operation ==="sign"){
      if (data.password !== passwordConfirmation) {
        setConfirmationError(true);
        return;
      }
      setConfirmationError(false)
      await UserService().setUser(dataClone)
        .then((res) => {navigate.push("/login");
        setValue("name", "")
        setValue("password", "")
        setNascimento(null)
        setPasswordConfirmation("")
        toast.success("Conta criada com sucesso ")
      })
        .catch(e => {console.log(e)})
    }else{
      if(!id){
        return
      }
       await UserService().updateUser(id, dataClone)
        .then((res) => {navigate("/login")})
        .catch(e => {console.log(e)})
    }
  };

 
  useEffect(()=> {
    if(operation ==="edit"){
      updateInfo()

    }
  }, [updateInfo])

  return (
   <>
    <Container className="mt-5">
      <Form className="bg-login p-4" onSubmit={handleSubmit(submit)}>
        <Row>
          <Form.Group as={Col} md={5}>
            <Form.Label>Usuario</Form.Label>
            <Controller
              control={control}
              name={"name"}
              render={({ field: { onChange, value } }) => (
                <InputMask
                  id={"name"}
                  className={"input"}
                  type="text"
                  mask=""
                  placeholder="Usuario"
                  value={value}
               
                  defaultValue={getValues("name")}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
              rules={{ required: "O Usuario é obrigatorio", maxLength: 50 }}
            />
            {errors?.name && (
              <Form.Text className="errorsMessage">
                {errors?.name.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        {operation === "sign" && (
        <><Row>
          <Form.Group as={Col} md={5} className="mt-2">
            <Form.Label>Password</Form.Label>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <InputMask
                    type="password"
                    mask=""
                    className="input"
                    placeholder="password"
                    value={value}
                    defaultValue={getValues("password")}
                    onChange={(e) => onChange(e)}
                  ></InputMask>
                </OverlayTrigger>
              )}
              rules={{ required: "A senha é obrigatoria", maxLength: 40 }}
            />
               {errors.password && (
              <Form.Text className="errorsMessage">
                {errors.password?.message}
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="mt-2">
          <Form.Group as={Col} md={5} className="">
            <Form.Label>Comfirmação de senha</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirmation}
              bsPrefix="custom-class"
              className="input"
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            ></Form.Control>
            {confirmationError && (
              <Form.Text className="errorsMessage">As senhas não são iguais</Form.Text>
            )}
          </Form.Group>
        </Row></>)}
        <div className="text-end mt-3">
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </Container>
    </>
  );
};

export default FormUser;
