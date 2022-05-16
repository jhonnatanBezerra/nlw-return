import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbackRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request;

    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (
      screenshot &&
      !screenshot.startsWith('data:image/png;base64,')
    ) {
      throw new Error('Invalid screenshot');
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    const body = [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Novo feedback de ${type}</p>`,
      `<p>${comment}</p>`,
      `</div>`,
    ].join('\n');

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body,
    });
  }
}
