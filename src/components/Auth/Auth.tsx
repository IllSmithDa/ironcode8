import Loader from "../Loader/Loader";
import { axiosFetch } from "../../axios";
import { useRouter } from "next/router";


const fetchUser = async () => {
  const link = '/api/users/get-user-session';
  try {
    const response = await axiosFetch.get(link, { withCredentials: true });
    const { username } = response.data;
    return { username };
  } catch(err) {
    return {err}
  }
}


export default async function Auth({children}: {
  children: React.ReactNode
}) {
  const link = '/api/users/get-user-session';
  const { push } = useRouter();
  
  const user = await fetchUser();
  if (user.err) {
    push('/login')
  }


  return (
    <section style={{ width: '100%', backgroundColor: '#111'}}>
    {
      !user.username?
      <Loader />:
      <>{children}</>
    }
    </section>
  )
}
