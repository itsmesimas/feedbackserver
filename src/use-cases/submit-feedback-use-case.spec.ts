import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeebackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase({ create: createFeebackSpy }, { sendMail: sendMailSpy });

describe('Submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'example comment',
				screenshot: 'data:image/png;base64,o12p3kp1ko2op3k1po2k3pko',
			}),
		).resolves.not.toThrow();
		expect(createFeebackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should not be able to submit a feedback without a type', async () => {
		await expect(
			submitFeedback.execute({
				type: '',
				comment: 'example comment',
				screenshot: 'data:image/png;base64,o12p3kp1ko2op3k1po2k3pko',
			}),
		).rejects.toThrow();
	});

	it('should not be able to submit a feedback without a comment', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: '',
				screenshot: 'data:image/png;base64,o12p3kp1ko2op3k1po2k3pko',
			}),
		).rejects.toThrow();
	});

	it('should not be able to submit a feedback without a invalid screenshot', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'Tá tudo bugado',
				screenshot: 'test.jpg',
			}),
		).rejects.toThrow();
	});
});
