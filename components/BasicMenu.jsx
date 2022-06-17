import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {IoEllipsisHorizontalCircleOutline} from "react-icons/io5";
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import app from '../lib/firebase';
import toast from 'react-hot-toast';
export default function BasicMenu({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    window.location.reload();
  };
  
  const handleDelete = async (event) => {
    event.stopPropagation();
    const db = getFirestore(app);
    await deleteDoc(doc(db, "Posts", id)).then((err) => {
      if(err){
        toast.error("We couldn't able to delete.");
      } else {
        toast.success("Succesfully deleted!");
      }
    });
    handleClose(event);
  }
  const handleUnread = async (event) => {
    event.stopPropagation();
    const db = getFirestore(app);
    const postRef = doc(db,"Posts" , id)
    await updateDoc(postRef, {
      opened: false,
    })
    handleClose(event);
   };

  return (
    <div className='absolute top-4 right-4'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IoEllipsisHorizontalCircleOutline fontSize={52} className="text-white " />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleUnread}>Mark as unread</MenuItem>
      
      </Menu>
    </div>
  );
}