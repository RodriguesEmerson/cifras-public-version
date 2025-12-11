

export class TypesValidators{
   validateString(fieldName: string, str: any, throwError: boolean){
      if(typeof str !== 'string'){
         if(throwError) throw new Error(`O tipo do campo (${fieldName}) não corresponde ao tipo pedido (string)`);
         return false;
      }
      return true;
   }
   validateNumber(fieldName: string, num: any, throwError: boolean){
      if(typeof num !== 'number'){
         if(throwError) throw new Error(`O tipo do campo (${fieldName} - ${ typeof(num)}) não corresponde ao tipo pedido (number)`);
         return false;
      }
      return true;
   }
   validateBoolean(fieldName: string, bool: any, throwError: boolean){
      if(typeof bool !== 'boolean'){
         if(throwError) throw new Error(`O tipo do campo (${fieldName}) não corresponde ao tipo pedido (boolean)`);
         return false;
      }
      return true;
   }
}