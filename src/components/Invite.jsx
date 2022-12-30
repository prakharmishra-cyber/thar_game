import React from 'react';
import { useNavigate } from 'react-router-dom';
import sample_qr from '../images/sample_qr.png';
import db from '../firebase/config.js';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useLayoutEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import QRCode from "react-qr-code";


const Invite = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cb, setCb] = useState({
        value: '',
        copied: false
    });

    const getUserDetails = async () => {
        const details = await getDoc(doc(db, 'users', auth.currentUser.uid));
        setUserDetails(details.data());
    }

    useLayoutEffect(() => {
        getUserDetails();
        setLoading(false);
    }, []);

    if (loading || userDetails === null) {
        return (
            <div className='h-screen grid place-items-center'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className=' bg-[#2e9afe] h-screen flex flex-col text-white font-light p-5'>
            <div className="top p-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </div>

            <p className='p-3 text-xs break-words'>
                http://localhost:3000/register/invite_code/${userDetails.user_invite}
            </p>

            <div className='p-3 font-bold cursor-pointer'>
                <CopyToClipboard text={`http://localhost:3000/register/invite_code/${userDetails.user_invite}`} onCopy={() => toast('Copied to clipboard')}>
                    <span>Invite Link: click to copy</span>
                </CopyToClipboard>
            </div>

            <div className="invitation flex p-3">
                <div className='font-bold'>Invitation code: {userDetails.user_invite}</div>
                <CopyToClipboard text={userDetails.user_invite} onCopy={() => toast('Copied to clipboard')}>
                    <span className='ml-2'>Copy code</span>
                </CopyToClipboard>
            </div>

            <div className="qr mx-auto ">
                <QRCode
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={`http://localhost:3000/register/invite_code/${userDetails.user_invite}`}
                    viewBox={`0 0 200 200`}
                />
            </div>

            <div className="info p-3 sm:text-xs md:text-md">
                Invitation rewards: Welcome to use the APP, invite new friends to join, you can get very high invitation rewards, and you can quickly withdraw cash to your bank account every day. APP is the safest, most popular and most profitable APP in 2022, dedicated to benefiting all mankind and promoting it globally. Invite new friends to join and you will get the following different invitation rewards:
                <br />
                Level 1, 10%
                <br />
                Level 2, 5%
            </div>

        </div>
    )
}

export default Invite