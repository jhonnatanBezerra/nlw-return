import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./FeedbackTypeStep";
import { FeedbackContentStep } from "./FeedbackContentStep";
import {  FeedbackSucessStep } from "./FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {title: 'problema', image:{ source: bugImageUrl, alt: 'Imagem de um inseto'} },
  IDEA: {title: 'idea',image:{ source: ideaImageUrl, alt: 'Imagem de um lampada'}  },
  OTHER: {title: 'outro',image:{ source: thoughtImageUrl, alt: 'Imagem de um balao'}  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {

   const [feedbackType, setFeedbackType] = useState<FeedbackType | null >(null)
   const [feedbackSend, setFeedbackSend] = useState(false);

   const handleRestartFeedback = () => {
     setFeedbackType(null)
     setFeedbackSend(false)
   }

  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto '>
      
      {feedbackSend ?(
        <FeedbackSucessStep  onFeedbackRestartRequest={handleRestartFeedback}  />
      ) :(
        <>
        { !feedbackType ? 

          <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
        :
          <FeedbackContentStep 
          selectedFeedbackType={feedbackType} 
          onFeedbackRestartRequest={handleRestartFeedback} 
          onFeedbackSend={ setFeedbackSend } />
        }
        </>
      )
     }

      <footer className="text-xs text-neutral-400">
        Feito com ♥ por <a className="underline underline-offset-2" href="#">Jhonnatan Bezerra</a>
      </footer>


    </div>

  );
}