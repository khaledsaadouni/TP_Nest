import { IsNotEmpty, MaxLength, MinLength, ValidationArguments } from "class-validator";
import { errorMessages } from "../../../utils/ErrorMessge";
const error = (validationData: ValidationArguments) => {
  return `La taille de votre ${validationData.property} ${validationData.value} est courte,
la taille minimale de ${validationData.property} est ${validationData.constraints[0]}`;
};
export class TodoAddDto {
  @IsNotEmpty()
  @MinLength(10, {
    message: errorMessages.sizeErrorMessage(),
  })
  @MaxLength(10, {
    message: errorMessages.sizeErrorMessage(false),
  })
  public name: string;

  @IsNotEmpty()
  @MinLength(10, {
    message: errorMessages.sizeErrorMessage(),
  })
  public description: string;
}
