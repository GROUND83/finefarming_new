import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UseFormSetValue } from "react-hook-form";

interface InputProps {
  name: string;

  setvalue: UseFormSetValue<any>;
}
export const NumberInput = ({
  name,
  min,
  setvalue,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const clickPlus = () => {
    //
    console.log(rest.value);
    if (rest) {
      if (rest.value) {
        let result = (Number(rest.value) + 1).toString();
        setvalue(name, result);
      }
    }
  };
  const clickMinus = () => {
    console.log(rest.value);
    if (rest) {
      if (rest.value) {
        if (Number(rest.value) > 0) {
          let result = (Number(rest.value) - 1).toString();

          setvalue(name, result);
        }
      }
    }
  };
  return (
    <div className="flex flex-row items-center gap-1 flex-1">
      <div>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => clickMinus()}
          disabled={rest.value === "0"}
        >
          -
        </Button>
      </div>
      <Input
        type="text"
        disabled
        name={name}
        className="w-[50px] text-center text-black"
        value={rest.value}
        onChange={rest.onChange}
        // {...rest}
      />
      <div>
        <Button type="button" variant={"outline"} onClick={() => clickPlus()}>
          +
        </Button>
      </div>
    </div>
  );
};
