'use client';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState,} from 'react';
import { axiosFetch } from '../../axios';

export default function ProfileDropdown({ username }: { username: string}) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const logout = async () => {
    const response = await axiosFetch.get('/api/users/logout-user',  { withCredentials: true });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  return (
    <>
      <li className='app-icons'>
        {
          username ?
          <button
            onClick={() => setToggleModal(!toggleModal)}
            className={`
              w-[47px] h-[47px]
            `}
          >
            <FontAwesomeIcon
              icon={faUser}
              tabIndex={0}
              aria-label='light mode icon'
              className='text-[2.5rem] cursor-pointer hover:text-[#DDD] '
            />
          </button>:
          <></>
        }
        {
          toggleModal ?
          <section
            className={`
              absolute bg-[#181818] w-[300px] right-0 z-[100] p-[2rem] h-[500px]
              flex flex-col justify-center items-center gap-[1rem]
            `}
          >
            <button
              onClick={() => { console.log('Setting activated!')}}
              className={`
                bg-[#2A2A2A] text-[1.5rem] p-[1rem] border-box w-[100%] w-[175px] 
                hover:bg-[#333] right-0
              `}
            >  
              Settings
            </button>
            <button
              onClick={() => logout()}
              className={`
                bg-[#2A2A2A] text-[1.5rem] p-[1rem] border-box w-[100%] w-[175px] 
                hover:bg-[#333] right-0
              `}
            >  
              Logout
            </button>
          </section>:
          <></>
        }
      </li>
      {
        toggleModal? 
        <div className={`
          fixed z-[25] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
        `} onClick={() => {
          setToggleModal(false);
        }}></div>:
        <></>
      }
    </>
  )
}