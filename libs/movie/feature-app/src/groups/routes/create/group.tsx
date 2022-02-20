import { createGroup, getUser } from "@projects/libs/movie/data-access";
import { useForm } from "react-hook-form";

export default function CreateGroup() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: unkown) => {
    const user = await getUser();
    console.log(user);
    console.log(await createGroup(data.groupName));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("groupName")} />
    </form>
  );
}
