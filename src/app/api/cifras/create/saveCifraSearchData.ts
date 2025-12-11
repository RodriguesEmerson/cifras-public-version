import { CifraSearchDataType } from "@/types/cifraSearchType";
import { NewCifraType } from "@/types/cifraTypes";
import fs from 'fs';
import path from 'path';

/**
 * Salva os dados em hymnsData.json para pesquisas
 * @return boolean
 */
export function saveCifraSearchData(cifra: NewCifraType) {
   //Salva os dados em hymnsData.json para pesquisas
   try{
      const filePath = path.join(process.cwd(), '/src/lib/searchData/hymnsData.json');
      const hymnsData: CifraSearchDataType[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (!hymnsData) {
         throw new Error;
      }
   
      hymnsData.push({
         title: cifra.title,
         album: cifra.album.replaceAll(' ', '-'),
         sanitized_title: cifra.sanitized_title,
         author: cifra.author,
         sanitized_author_name: cifra.sanitized_author_name!,
         number: cifra.number,
         flag: `hino ${cifra.type === 'hinario' ? cifra.number : 'avulso'} ${cifra.sanitized_title}`
      });
   
      fs.writeFileSync(filePath, JSON.stringify(hymnsData, null, 3), "utf-8");
   }catch(e){
      throw new Error ("Não foi possível salvar os dados da cifra")
   }
}