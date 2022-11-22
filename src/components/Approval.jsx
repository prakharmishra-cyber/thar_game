import React from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import db from '../firebase/config.js'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import useInterval from '../hooks/useInterval.js';

const Approval = () => {

    const [recharge_list, setRecharge_list] = useState(null);
    const navigate = useNavigate();

    const getRecharges_list = async () => {
        const docRef = collection(db, 'recharges');
        const docSnap = await getDocs(docRef);
        // console.log(docSnap);
        var temp_Data = [];
        var idx = 0;
        docSnap.forEach((doc) => {
            temp_Data = [...temp_Data, {...doc.data(), 'recharge_id':docSnap._snapshot.docChanges[idx].doc.key.path.segments[6]}];
            console.log(temp_Data);
            idx+=1;
        });
        //_snapshot.docChanges[0].doc.key
        setRecharge_list(temp_Data);
        
    }

    // useInterval(getRecharges_list, 10000);

    useEffect(() => {
        const getRecharges_list = async () => {
            const docRef = collection(db, 'recharges');
            const docSnap = await getDocs(docRef);
            // console.log(docSnap);
            var temp_Data = [];
            var idx = 0;
            docSnap.forEach((doc) => {
                temp_Data = [...temp_Data, {...doc.data(), 'recharge_id':docSnap._snapshot.docChanges[idx].doc.key.path.segments[6]}];
                console.log(temp_Data);
                idx+=1;
            });
            //_snapshot.docChanges[0].doc.key
            setRecharge_list(temp_Data);
            
        }
        getRecharges_list();
    }, []);

    const updateStatus = async (recharge_id, new_status) => {
        const docRef = doc(db, 'recharges', recharge_id);
        await updateDoc(docRef, {
            status: new_status
          }).then(()=>{
            console.log('Recharge Status Approved');
            getRecharges_list();
          }).catch((error)=>{
            console.log('Some Error Occured');
          });
    }



    return (
        <div className='sm:h-[700px] md:h-[950px] flex flex-col gap-4 bg-[#F2F2F2]'>
            <div className="options text-center text-white flex gap-2 items-center p-2  bg-[#0F5AF2] text-lg pt-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/mine')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  storke-white  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <div className='flex-grow'>Recharge Approval List</div>
            </div>
            <div className='flex flex-col p-3 gap-y-2'>
                <div className='text-xl font-semibold'>Recharge Requests</div>
                <hr />
                {recharge_list === null && (<div className='flex flex-col justify-center items-center'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="2"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                    <div className='text-lg text-gray-500'>Loading...</div>
                </div>)}
                {recharge_list && recharge_list.map((element, id) => {
                    return (
                        <div key={id} className="bg-blue-400 rounded-lg shadow-md p-2 text-white">
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col gap-1'>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Mobile No:</span>  {element.mobno}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Recharge Value:</span> {element.recharge_value}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Ref No:</span> {element.refno}</div>
                                    <div className='text-white text-md overflow-clip'><span className='font-bold text-gray-500'>Status:</span> {element.status}</div>
                                </div>
                                <div className='flex gap-1'>
                                    <button className='bg-green-500 text-sm shadow-lg rounded-lg p-2' onClick={()=>updateStatus(element.recharge_id, 'confirmed')}>Confirm</button>
                                    <button className='bg-red-500 text-sm shadow-lg rounded-lg p-2' onClick={()=>updateStatus(element.recharge_id, 'declined')}>Decline</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Approval