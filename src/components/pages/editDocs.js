import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { Button } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteDocModal from '../deleteDocModal'
import CircularProgress from '@mui/material/CircularProgress'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.core.css'
import Editor from "../editor";
import IconButton from '@mui/material/IconButton';

import { motion } from "framer-motion";
import { container, docsIn, docsOut } from "../helpers/helper";
// Quill editor
export const EditDocs = (props) => {
    let params = useParams()
    const [user, loading] = useAuthState(auth);
    const isMounted = useRef()
    const collectionRef = collection(db, 'docs')
    const [documentTitle, setDocumentTitle] = useState('')
    const [email, setEmail] = useState('')
    const [privates, setPrivates] = useState('')
    const [docsDesc, setDocsDesc] = useState('');
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
  
    const navigate = useNavigate();

    const getQuillData = (value) => {
        setDocsDesc(value)
    }

    useEffect(() => {
        if (loading)return;   
        if (!user) return navigate("/");
    }, [user, loading, navigate])

    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc
            }).then(() => {
                
            }).catch(() => {
                toast.error('cannot Save', {
                    autoClose: 1000
                })
            })
        }, 1000)
        return () => clearTimeout(updateDocsData)
    }, [docsDesc, user, collectionRef, params.id])

    useEffect(() => {
        if(isMounted.current){
            return
        }
        isMounted.current = true;
        getData()
    })

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
          setDocumentTitle(docs.data().title)
          setDocsDesc(docs.data().docsDesc);
          setEmail(docs.data().from)
          setPrivates(docs.data().private)
        })
    }
    
    // if using different formats
    
    return (<>
        {privates && email !== user.email ? navigate("/") : (<>
            <ToastContainer />
            <motion.div variants={container} initial="hidden" animate="show">
            {/* editor header */}
                <div className="flex docsHeader">
                    {loading ? <h1> laoding... </h1> : (<>
                    <motion.div variants={docsOut} initial="hidden" animate="show">
                        <Button onClick={() => {privates === true ? (navigate("/home")) : navigate("/home")}}>go back</Button> 
                    </motion.div>
                    <h1>{documentTitle}</h1> 
                    {email === user.email ? (<>
                      <IconButton color="primary" aria-label="close modal" component="span" onClick={handleOpen}>
                            <DeleteForeverOutlinedIcon  />
                      </IconButton>
            </>) : null}
                </>)}
            </div>
            {loading 
            ? (<>
            <CircularProgress />
            </>)
            : (<>
              <Editor onchanges={getQuillData} values={docsDesc} />
            </>)}
        </motion.div>
        <DeleteDocModal open={open} setOpen={setOpen} title={documentTitle} />
        </>)}

    </>)
}