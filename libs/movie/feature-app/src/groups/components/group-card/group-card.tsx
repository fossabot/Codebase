import { Card, Title } from "@projects/libs/movie/core-ui";
import { useNavigate } from "@tanstack/react-location";
import styled, { css } from "styled-components";

/* eslint-disable-next-line */
export interface GroupCardProps {
  group: unkown;
}

export function GroupCard({ group }: GroupCardProps) {
  const router = useNavigate();

  return (
    <Card
      padding="0.75"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => router({ to: `../group/${group.id}` })}
    >
      <Title>{group.name}</Title>
    </Card>
  );
}

export default GroupCard;
