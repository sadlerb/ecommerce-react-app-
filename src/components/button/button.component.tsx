import { BaseButton,GoogleSignInButton,InvertedButton } from "./button.styles";


import {FC,ButtonHTMLAttributes} from 'react'
import { selectCategoriesIsLoading } from "../../store/categories/category.selector";

export enum BUTTON_TYPE_CLASSES {
    google = 'google-sign-in',
    inverted = 'inverted',
    base = 'base'
}

export type ButtonProps ={
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;

} & ButtonHTMLAttributes<HTMLButtonElement>


const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton  =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);
const Button: FC<ButtonProps> =({children,buttonType,isLoading,...otherProps}) =>{
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;}

export default Button