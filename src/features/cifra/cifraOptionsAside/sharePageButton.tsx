'use client';
import ShareIcon from '@mui/icons-material/Share';


export function SharePageButton() {

   function sharePage(){
      navigator.share({
         title: document.title,
         text: `Aprenda a tocar a cifra do ${document.title.split('|')[0]}`,
         url: window.location.href
      })
      .then(() => {})
      .catch(e => alert("Erro ao tentar compartilhar."))
   }

   return (
      <button 
         className={`options-bar-button`}
         onClick={sharePage}
      >
         <span>Compartilhar</span><ShareIcon fontSize='inherit' />
      </button>
   )
}