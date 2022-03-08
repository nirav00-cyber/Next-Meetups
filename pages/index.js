//ourdomain.com
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";



function HomePage(props)
{

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse a huge list of highly active react meetups"></meta>
      </Head>
    <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

// export async function getServerSideProps(context)
// {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//          meetups:DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps()
{
   const client = await MongoClient.connect('mongodb+srv://niravdamor:nick1234@cluster0.wpqlz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id:meetup._id.toString()
      }))
    },
    revalidate:1
  };
}

export default HomePage;
