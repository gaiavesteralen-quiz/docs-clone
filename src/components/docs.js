import React, { useEffect, useState, useRef } from 'react';
import { query, orderBy, limit, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from '@mui/material/CircularProgress'

import { motion } from 'framer-motion';
import { docsIn, docsOut } from './helpers/helper';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { NavBtn } from './docNav';

//firestore database reference
const collectionRef = collection(db, 'docs')
const q = query(collectionRef, orderBy('created'), limit(24))
//framer motion animation
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
//a component that listens for changes in firestore db
export const FirestoreCollection = (props) => {
  const [value, loading, error] = useCollection(
    q,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [publicDocs, setPublicDocs] = useState(props.public);
  const [privateDocs, setPrivateDocs] = useState(props.private)
  const [isOn, setIsOn] = useState(false);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const isMounted = useRef()

  const publics = "public"
  const privates = "private"


  useEffect(() => {
    if(isMounted.current){
        return
    }
    isMounted.current = true;

    // getData()
  })

  const getID = (id) => {
    navigate(`/editDocs/${id}`)
}

  const Docs = (doc, publics, email) => {
    return (<>
        <div className='doc grid' key={doc.id} onClick={() => {getID(doc.id)}}>     
        {loading ? (<>
            <div className='documentContainer'></div>
        </>) : null}
            <div className='documentContainer'>
                <Avatar className='documentPic' src={doc.data().photoURL} alt='?????'/>
                <Button className='documentTitle'>{(doc.data().title)}</Button>
                <br />
                <div className='flex'>
                    <p className='documentPublicStatus'>{publics}</p>
                </div>
            </div> 
        </div>
    </>)
  }

  const showPublicDocs = () => {
    setPublicDocs(true)
    setPrivateDocs(false)
    setIsOn(!isOn)
  }

  const showPrivateDocs = () => {
    setPrivateDocs(true)
    setPublicDocs(false)
    setIsOn(!isOn)
  }

  return (<>
        {error && <strong className='docs grid loading'>Error: {JSON.stringify(error)}</strong>}
        {/* loading screen */}
        {loading && (<>
            <div className='spinningContainer grid'>
                <div>
                    <CircularProgress />
                </div>
            </div>
        </>)}
        {value && (<>
            <NavBtn btn={props.btn} showpub={showPublicDocs} showpriv={showPrivateDocs}/>
            <div className='docs grid'>
                {value.docs.map((doc) => (
                <>   
                {/* maps data from firestore if public*/}
                {doc.data().public === true ? (<>
                    {publicDocs === true ? (<>
                        <motion.div variants={docsIn} initial={"hidden"} animate={"show"}>
                            {loading && (<>
                                <CircularProgress />
                            </>)}
                            {Docs(doc, publics, user.email)}
                        </motion.div>
                    </>) : null}
                 </>): null}
                </>
                ))}
                {/* maps data from firestore if private*/}
                {value.docs.map((doc) => (
                <>   
                { user.email === doc.data().from ? (<>
                { privateDocs === true ?  (<>
                    { doc.data().private === true ? (<>
                        <motion.div variants={docsOut} initial={"hidden"} animate={"show"}>
                            {loading ? (<>
                                <CircularProgress />
                            </>) : Docs(doc, privates, user.email)}
                        </motion.div>
                    </>) : null}
                     </>) : null}
                </>) : null}
                </>
                ))}
            </div>
        </>)}
    </>);
};

