import {  ArrowLeft, Camera, CircleNotch, Trash } from 'phosphor-react';
import  { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';
import html2canvas from 'html2canvas';

interface FeedbackContentStepProps {
  selectedFeedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSend: (value: boolean) => void;
}

export const FeedbackContentStep = ({selectedFeedbackType, onFeedbackRestartRequest, onFeedbackSend}: FeedbackContentStepProps) => {
  
  const feedbackTypeInfo = feedbackTypes[selectedFeedbackType]

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = (event: FormEvent) => {
    event.preventDefault();
    onFeedbackSend(true);
  }

  
  return (
    <>
      <header>

        <button onClick={onFeedbackRestartRequest}
         type='button' className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'>
          <ArrowLeft weight='bold' className='h-4 w-4' />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
        <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}
          </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">

        <textarea onChange={e => setComment(e.target.value)} className='min-w-[304px] w-full min-h-[112px] text-sm text-zinc-100 placeholder-zinc-400 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none  resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
        placeholder='Conte com detalhes o que esta acontecendo...' />


        <footer className='flex gap-2 mt-2'>

          <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot} />

          <button type='submit' disabled={comment.length === 0}
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'>
          Enviar Feedback 
          </button>
        </footer>
       
      </form>
      
    </>
  );
}

interface ScreenshotButtonProps {
  screenshot: string | null; 
  onScreenshotTook: (screenshot: string | null) => void;
}

const ScreenshotButton = ({onScreenshotTook, screenshot}:ScreenshotButtonProps) => {

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  const handleTakeScreenshot = async () => {

    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64Img = canvas.toDataURL('image/png');

    onScreenshotTook(base64Img);
    setIsTakingScreenshot(false);

  }

  if(screenshot){
    return(
      <button className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
      onClick={()=> onScreenshotTook(null)}
      type='button' style={{
        backgroundImage: `url(${screenshot})`,
        backgroundPosition: 'right bottom',
        backgroundSize: 180
       }}>

        <Trash weight='fill' />


      </button>
    )
  }

  return(
    <button onClick={handleTakeScreenshot}
      className='p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors' 
      type='button'>
      
      {isTakingScreenshot ? <Loading /> : <Camera className='h-6 w-6' weight='bold' />}
      
    </button>
  )
}

const Loading = () => {
  return(
    <div className='w-6 h-6 flex items-center justify-center overflow-hidden'>
      <CircleNotch className='h-4 w-4 animate-spin' weight='bold' />
    </div>
  )
}