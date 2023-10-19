import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsCpf(
    property?: string,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isCpfValid',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const cpf = value;
            if (typeof cpf !== 'string') {
              return false;
            }
            return isValid(cpf);
          },
        },
      });
    };
  }


function isValid(cpf: string): boolean {
    cpf = cpf.replace(/[\.-]/g, ''); // Remove pontos e traços
    cpf.length !== 11 ? false : true;
  
    let sum = 0;
    let remainder: number;
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    remainder = (sum * 10) % 11;
  
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
  
    return remainder === parseInt(cpf.substring(10, 11));
  }