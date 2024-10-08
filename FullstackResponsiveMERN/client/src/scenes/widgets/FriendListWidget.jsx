
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "componentes/Friend";
import WidgetWrapper from "componentes/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  // const dispatch = useDispatch()
  const [friendsLocal, setFriendsLocal] = useState([])
  const { palette } = useTheme()
  const token = useSelector(({token}) => token)
  // const friends = useSelector(({user}) => user.friends)
  
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`}
      }
    )
    const data = await response.json()
    // dispatch(setFriends({ friends: data }))
    /* Disconnected 'friends' data from 'store' into local state to provide proper number of friends after 'redirect' */
    setFriendsLocal(data)
  }
 
  useEffect(() => {
    getFriends()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {friendsLocal.map((friend) => (
          <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
