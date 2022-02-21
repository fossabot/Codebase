import {
  Button,
  Input,
  Link,
  Modal,
  Text,
  Title,
  Col,
  Row,
} from "@projects/libs/movie/core-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import styled from "styled-components";
import { signIn } from "@projects/libs/movie/data-access";

/* eslint-disable-next-line */
export interface AuthModalProps {
  onSignUp: () => void;
}

const ErrorMsg = styled.p`
  color: rgba(200, 100, 100);
`;

// const Row = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   gap: ${(props: { gap?: string }) => `${props?.gap || "1"}rem`};
//   align-items: space-between;
// `;

const Model = Joi.object({
  email: Joi.string().pattern(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { name: "email" }
  ),
  password: Joi.string().min(7),
}).required();

export function SignInButton(props: AuthModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Model),
  });

  const [error, setError] = useState<{
    btnDisable: boolean;
    msg: null | string;
  }>({ btnDisable: false, msg: null });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (error.msg && error.btnDisable) {
      console.log("tesig");
      setError({ btnDisable: false, msg: null });
    }
  }, [email, password]);

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    console.log(email, password);
    try {
      await signIn(email, password);
    } catch (e: any) {
      if (e.response.data.message === "Unauthorized") {
        setError({ msg: "User already exists!", btnDisable: true });
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="text" onClick={() => setIsOpen(true)}>
        Sign In
      </Button>
      <Modal isOpen={isOpen} width="45">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row far>
            <Col far style={{ alignItems: "flex-start" }}>
              <Title>Sign Up Today!</Title>
              <Text
                onClick={() => setIsOpen(false)}
                style={{ fontWeight: "bolder", cursor: "pointer" }}
              >
                x
              </Text>
            </Col>
            <Input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors?.["email"]?.message && (
              <ErrorMsg>{errors?.["email"]?.message}</ErrorMsg>
            )}
            <Row gap="0.5">
              <Input
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors?.["password"]?.message && (
                <ErrorMsg>{errors?.["password"]?.message}</ErrorMsg>
              )}
            </Row>
            {error.msg && <ErrorMsg>{error.msg}</ErrorMsg>}
            <Button disabled={error.btnDisable}>SUBMIT</Button>
            <Col far={true}>
              <Link
                onClick={() =>
                  window.open("mailto:vincent.nathan.thomas@gmail.com")
                }
              >
                Forgot your account?
              </Link>
              <Text>
                Dont have an account?{" "}
                <Link to="" onClick={props.onSignUp}>
                  Sign up!
                </Link>
              </Text>
            </Col>
          </Row>
        </form>
      </Modal>
    </>
  );
}
