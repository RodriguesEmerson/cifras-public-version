import { TypesValidators } from "@/lib/utils/typesValidators";
import { NewCifraDTOType, NewCifraType } from "@/types/cifraTypes";


export function newCifraDTO(data: NewCifraDTOType): NewCifraType {

   const typesValidators = new TypesValidators();

   const validsChords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
   const requiredFields = [
      'id', 'author', 'author_image', 'cifra', 'intro',
      'number', 'title', 'sanitized_title', 'video_url', 'views', 'type', 'tone',
      'is_verified'
   ]

   const dataKeys = Object.keys(data);

   requiredFields.forEach(key => {
      if (!dataKeys.includes(key)) {
         throw new Error(`O campo (${key}) não está presente nos dados enviados.`);
      }
   });

   ['author', 'author_image', 'cifra', 'intro',
      'number', 'title', 'sanitized_title', 'video_url', 'type'
   ].forEach(key => {
      const k = key as keyof NewCifraDTOType;
      typesValidators.validateString(key, data[k], true);
   });

   ['id', 'views'].forEach(key => {
      const k = key as keyof NewCifraDTOType;
      typesValidators.validateNumber(key, data[k], true);
   });

   typesValidators.validateBoolean('is_verified', data.is_verified, true);
   if (!['hinario', 'avulso'].includes(data.type)) throw new Error('O tipo deve ser "hinario" ou "avulso"');
   if (!validsChords.includes(data.tone)) throw new Error(`O tom ${data.tone} não é valido`);

   const sanitized_author_name = data.author
      .replace(/[,!?'-]/g, ' ')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replaceAll('  ', ' ');

   const number = data.type === 'hinario' ? `${data.id}` : '';

   return {
      id: data.id,
      author: data.author,
      album: data.album,
      author_image: data.author_image,
      cifra: data.cifra,
      intro: data.intro,
      is_verified: data.is_verified,
      number: number,
      sanitized_author_name: sanitized_author_name,
      sanitized_title: data.sanitized_title,
      title: data.title,
      tone: data.tone,
      type: data.type,
      video_url: data.video_url,
      views: data.views // Sempre 0
   }
}