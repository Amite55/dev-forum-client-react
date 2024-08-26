import React, { useState } from 'react';
import BookingModal from './BookingModal';


const JoinMembershipBtn = () => {
    const [isOpen, setIsOpen] = useState(false);


     // handle modal an the closeModal ========
     const closeModal = () => {
        setIsOpen(false)
     }
    return (
        <li>
            <button
                onClick={() => setIsOpen(true)}
            >
            Membership
            </button>
        
        {/* ===== payment modal ======= */}
            <BookingModal closeModal={closeModal} isOpen={isOpen} />
        </li>
    );
};

export default JoinMembershipBtn;