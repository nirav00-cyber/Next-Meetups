//ourDomain.com/new-meetup
import  Head  from 'next/head';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Router, useRouter } from 'next/router';
function NewMeetupPage()
{
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData)
    {
        
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/'); 
    }   
    return (
        <>
             <Head>
        <title>Add Meetup</title>
        <meta name="description" content="browse a huge list of highly active react meetups"></meta>
      </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
            </>);
}

export default NewMeetupPage;