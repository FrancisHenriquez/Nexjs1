import { useFormStatus } from 'react-dom';
import HydrationSafeIcon from './HydrationSafeIcon';

const SubmitMessage = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
      type="submit"
      disabled={pending}
    >
      <HydrationSafeIcon name="paperPlane" className="fas fa-paper-plane mr-2" />
      {''} {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default SubmitMessage;
