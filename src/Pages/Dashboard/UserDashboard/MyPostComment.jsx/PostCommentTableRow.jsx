import React, { useState } from 'react';
import UpdateCommentFeedback from './UpdateCommentFeedback';
import UpdateCommentReport from './UpdateCommentReport';

const PostCommentTableRow = ({cmt}) => {
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);


    return (
        <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap font-bold'>{cmt?.email}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{cmt?.comment}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>
            <button
            onClick={()=> setIsOpenFeedback(true)}  
            className='hover:text-cyan-500 font-semibold'>Feedback</button>
            </p>
            {/* open feedback modal */}
            <UpdateCommentFeedback 
             setIsOpenFeedback={setIsOpenFeedback}
             isOpenFeedback={isOpenFeedback}
            />
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='whitespace-no-wrap'>
          <button
            onClick={() => setIsOpenReport(true)}
           className='hover:text-cyan-500 font-semibold'>Report</button>
            </p>
            {/* open report modal */}
            <UpdateCommentReport 
              isOpenReport={isOpenReport}
              setIsOpenReport={setIsOpenReport}
              cmt={cmt}
            />
        </td>
      </tr>
    );
};

export default PostCommentTableRow;