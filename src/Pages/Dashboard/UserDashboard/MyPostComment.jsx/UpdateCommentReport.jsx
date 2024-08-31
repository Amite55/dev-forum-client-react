import { Fragment } from 'react'
import Select from 'react-select'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../customsHooks/useAxiosSecure';
// all reports ===========
const reports = [
    { value: 'This comment is spam.', label: 'This comment is spam.' },
    { value: 'This comment contains offensive or inappropriate content.', label: 'This comment contains offensive or inappropriate content.' },
    { value: 'This comment contains false or misleading information.', label: 'This comment contains false or misleading information.' },
  ];

const UpdateCommentReport = ({ setIsOpenReport, isOpenReport, cmt }) => {
    const axiosSecure = useAxiosSecure();

    const {mutateAsync} = useMutation({
        mutationFn: async (report) => {
            const {data} = await axiosSecure.post(`/report/upload`, report);
            return data;
        },
        onSuccess: () => {
            toast.success('Send your Report!')
        }
    })
    const handleReport = async (e) => {
        e.preventDefault();
        const report = e.target.report.value;
        const reports = {
            commentId: cmt?._id,
            comment: cmt?.comment,
            postedId: cmt?.postedId,
            name: user?.displayName,
            email: user?.email,
            reportTime: new Date(),
            report,
        }
        await mutateAsync(reports)
      }

    return (
        <Transition appear show={isOpenReport} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={() => setIsOpenReport(false)}
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
                                    Choose Report
                                </DialogTitle>
                            <form onSubmit={handleReport}>
                                <div className='mt-4 w-full'>

                                    {/* =========== input text  ========== */}
                                    
                                    <Select
                                        name="report"
                                        required
                                        options={reports}
                                        className=" rounded-lg w-full my-4 focus:bg-cyan-400"
                                        classNamePrefix="select"
                                    />

                                </div>
                                <hr className='mt-12 ' />

                                <div className='flex mt-8 justify-center gap-5'>
                                    <button
                                        
                                        type='submit'
                                        className='disabled:cursor-not-allowed inline-flex justify-center rounded-md border border-transparent bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2'
                                        onClick={() => setIsOpenReport(false)}
                                    >
                                        Send Report
                                    </button>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={() => setIsOpenReport(false)}
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

export default UpdateCommentReport;