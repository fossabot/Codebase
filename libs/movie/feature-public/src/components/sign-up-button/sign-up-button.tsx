import { Button, Input, Modal, Title } from "@projects/libs/movie/core-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import styled from "styled-components";

import { signUp } from "@projects/libs/movie/data-access";

/* eslint-disable-next-line */
export interface AuthModalProps {}

const ErrorMsg = styled.p`
  color: rgba(200, 100, 100);
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${(props: { gap?: string }) => `${props?.gap || "1"}rem`};
  align-items: space-between;
`;

const Model = Joi.object({
  email: Joi.string().pattern(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { name: "email" }
  ),
  password: Joi.string().min(7),
}).required();

export function SignUpButton(props: AuthModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Model),
  });
  const onSubmit = async (data: any) => {
    const { email, password } = data;
    console.log(email, password);
    console.log(await signUp(email, password));
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Sign Up</Button>
      <Modal isOpen={isOpen} width="45">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gap="1.5">
            <Row gap="0.5">
              <Title>Sign Up Today!</Title>
              <Input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  maxLength: 80,
                  minLength: 5,
                })}
              />

              {errors?.["email"]?.message && (
                <ErrorMsg>{errors?.["email"]?.message}</ErrorMsg>
              )}
            </Row>
            <Row gap="0.5">
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors?.["password"]?.message && (
                <ErrorMsg>{errors?.["password"]?.message}</ErrorMsg>
              )}
            </Row>

            <Button type="submit">SUBMIT</Button>
          </Row>
        </form>
      </Modal>
    </>
  );
}
