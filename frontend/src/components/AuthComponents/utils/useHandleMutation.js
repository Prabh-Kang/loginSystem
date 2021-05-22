import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN, REGISTER } from "./constants";
import { AuthContext } from "./authContext";

export default function useHandleMutation(type) {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  let mutationObj = {};

  if (type === "register") {
    mutationObj.mutation = REGISTER;
    mutationObj.updateFn = (result) => context.register(result.data.register);
  } 
  else if (type === "login") {
    mutationObj.mutation = LOGIN;
    mutationObj.updateFn = (result) => context.login(result.data.login);
  }


  const [mutateFn] = useMutation(mutationObj.mutation, {
    update(_, result) {
      mutationObj.updateFn(result);
      history.push("/");
    },
    onError(err) {
      try {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      } catch {
        console.log(err);
      }
    },
  });

  return [mutateFn, errors];
}
