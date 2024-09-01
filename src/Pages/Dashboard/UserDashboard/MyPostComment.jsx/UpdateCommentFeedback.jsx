import { Fragment } from 'react'
import Select from 'react-select'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import useAuth from '../../../../customsHooks/useAuth';
import useAxiosSecure from '../../../../customsHooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// all feedbackSelect ===========
const feedbackSelect = [
    { value: 'Misleading Information', label: 'Misleading Information' },
    { value: 'Offensive Language', label: 'Offensive Language' },
    { value: 'Harassment/Bullying', label: 'Harassment/Bullying' },
  ];

const UpdateCommentFeedback = ({setIsOpenFeedback, isOpenFeedback, cmt}) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {mutateAsync} = useMutation({
        mutationFn: async (feedback) => {
            const {data} = await axiosSecure.post(`/feedback/upload`, feedback);
            return data;
        },
        onSuccess: () => {
            toast.success('Send your Report!')
            setIsOpenFeedback(false)
        }
    })

    const handleFeedback = async (e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;
        const feedbackOptions = e.target.feedbackSelect.value;
        const feedbacks = {
            commentId: cmt?._id,
            comment: cmt?.comment,
            postedId: cmt?.postedId,
            commentEmail: cmt?.email,
            feedbackTime: new Date(),
            name: user?.displayName,
            email: user?.email,
            feedback,
            feedbackOptions
        }
        await mutateAsync(feedbacks)
    }

    return (
        <Transition appear show={isOpenFeedback} as={Fragment}>
        <Dialog
            as='div'
            className='relative z-10'
            onClose={() => setIsOpenFeedback(false)}
        >
            <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div className='fixed inset-0 bg-black bg-opacity-25' />
            </TransitionChild>

            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                    <TransitionChild
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <DialogPanel className='w-full h-72 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                            <DialogTitle
                                as='h3'
                                className='text-lg font-medium text-center leading-6 text-gray-900'
                            >
                                Send Your Impotent Feedback
                            </DialogTitle>
                        <form onSubmit={handleFeedback}>
                            <div className='mt-4 w-full'>

                                {/* =========== comment report set select ========== */}
                                <Select
                                        name="feedbackSelect"
                                        required
                                        options={feedbackSelect}
                                        className="  rounded-lg w-full my-4 focus:bg-cyan-400"
                                        classNamePrefix="select"
                                    />

                                <input className='w-full border rounded-lg h-12 px-2' type="text" name="feedback" required placeholder='Feedback' id="" />

                            </div>
                            <hr className='mt-16 ' />

                            <div className='flex mt-2 justify-center gap-5'>
                                <button
                                    type='submit'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2'
                                >
                                    Send Feedback
                                </button>
                                <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                    onClick={() => setIsOpenFeedback(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </Transition>
    );
};

export default UpdateCommentFeedback;