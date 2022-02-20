import { getAllGroups } from "@projects/libs/movie/data-access";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GroupCard from "../../components/group-card/group-card";
import { Navbar } from "../../components/navbar/navbar";

/* eslint-disable-next-line */
export interface HomeProps {}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 15rem);
  grid-auto-rows: 5rem;
  gap: 2rem;
  overflow: hidden;
`;

export function GroupsHome(props: HomeProps) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function main() {
      const { data } = await getAllGroups();
      setGroups(data);
    }
    main();
  }, []);

  return (
    <>
      <Navbar />
      <Grid>
        {groups.map((v, i) => (
          <GroupCard group={v} key={i} />
        ))}
      </Grid>
    </>
  );
}
